const redis = require("redis");
const UserAgent = require("useragent");
const Link = require("../models/url.model");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const generateHashedString = require("../utils/generateLink");
const getTitleFromUrl = require("../utils/getTitle");

async function shortenLink(req, res, next) {
    let { url, back_half, title } = req.body;
    if (!url) {
        return next(errorHandler(400, "Url required"));
    }
    if (!title) {
        title = await getTitleFromUrl(url);
    }
    const { id, username } = req.user;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return next(errorHandler(404, "User not found"));
        }
        const domain = url.split("/")[2];
        const logo = `https://logo.clearbit.com/${domain}?size=32`;
        if (back_half) {
            const existingBackHalf = await Link.findOne({ back_half });
            if (existingBackHalf) {
                return next(errorHandler(400, "Back half already exists"));
            }

            const newLink = new Link({
                url,
                shortUrl: back_half,
                title,
                user: id,
                logo,
            });
            await newLink.save();
            res.status(201).json({ message: "Link created successfully" });
        } else {
            const shortUrl = generateHashedString(username);
            const newLink = new Link({
                url,
                shortUrl,
                title,
                user: id,
                logo,
            });
            await newLink.save();
            res.status(201).json({ message: "Link created successfully" });
        }
    } catch (error) {
        console.log(error);
        next(errorHandler(400, error.message));
    }
}

async function redirectToOriginalLink(req, res, next) {
    const { shortUrl } = req.params;
    const agent = UserAgent.parse(req.headers["user-agent"]);
    console.log(agent.toString());
    console.log(agent.toAgent()); // Example output: "Chrome 98.0.4758"
    console.log(agent.os.toString()); // Example output: "Windows 10.0"
    console.log(agent.device.toString());
    try {
        const client = redis.createClient({ url: "redis://127.0.0.1:6379" }); // Create Redis client
        await client.connect(); // Connect to Redis server

        // Check Redis cache for short URL
        const cachedUrl = await client.get(shortUrl);
        // console.log(cachedUrl)
        if (cachedUrl) {
            console.log("Link retrieved from Redis cache");
            res.redirect(cachedUrl);
            const link = await Link.findOne({ shortUrl });
            link.clicks++;
            await link.save();
            return;
            // next();
        } else {
            const link = await Link.findOne({ shortUrl });

            if (!link) {
                return next(errorHandler(404, "Link not found"));
            }

            // Update link object in database (consider background updates)
            link.clicks++;
            await link.save(); // Update database for better consistency

            // Cache the retrieved link in Redis
            await client.set(shortUrl, link.url, { EX: 3600 }); // Set expiry for 1 hour
            console.log("Link retrieved from database and cached in Redis");

            return res.redirect(link.url);
        }
    } catch (error) {
        console.error(error);
        next(errorHandler(400, error.message));
    }
}

async function deleteLink(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const link = await Link.findOneAndDelete({ shortUrl });
        if (!link) {
            return next(errorHandler(404, "Link not found"));
        }
        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        console.error(error);
        next(errorHandler(400, error.message));
    }
}

async function updateLink(req, res, next) {
    const { shortUrl } = req.params;
    const { title } = req.body;
    if (!title) return next(errorHandler(400, "Title is required"));
    try {
        const link = await Link.findOneAndUpdate(
            { shortUrl },
            { title },
            { new: true }
        );
        if (!link) {
            return next(errorHandler(404, "Link not found"));
        }
        res.status(200).json({ message: "Link updated successfully" });
    } catch (error) {
        console.error(error);
        next(errorHandler(400, error.message));
    }
}

async function getLinks(req, res, next) {
    // const { username } = req.params;
    const { username } = req.user;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return next(errorHandler(404, "User not found"));
        }
        const links = await Link.find({ user: user._id });
        res.status(200).json({ links });
    } catch (error) {
        console.error(error);
        next(errorHandler(400, error.message));
    }
}

async function getLinkDetails(req, res, next) {
    console.log("inside get link details");
    const { shortUrl } = req.params;
    console.log("short url", shortUrl);
    try {
        const link = await Link.findOne({ shortUrl });
        if (!link) {
            return next(errorHandler(404, "Link not found"));
        }
        res.status(200).json({ link });
    } catch (error) {
        console.error(error);
        next(errorHandler(400, error.message));
    }
}

module.exports = {
    shortenLink,
    redirectToOriginalLink,
    deleteLink,
    updateLink,
    getLinks,
    getLinkDetails,
};
