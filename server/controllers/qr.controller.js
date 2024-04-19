const User = require('../models/user.model');
const QrCode = require('../models/qrcode.model');
const generateHashedString = require('../utils/generateLink');
const errorHandler = require('../utils/error');
const Link = require('../models/url.model');
const getTitleFromUrl = require('../utils/getTitle');

async function createQrCode(req, res, next) {
    let { url, back_half, title, properties } = req.body;
    if (!url) {
        return next(errorHandler(400, 'Url required'));
    }
    if (!title) {
        title = await getTitleFromUrl(url);
    }
    let { id, username } = req.user;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return next(errorHandler(404, 'User not found'));
        }
        const domain = url.split('/')[2];
        const logo = `https://logo.clearbit.com/${domain}?size=32`;
        if (back_half) {
            const existingBackHalf = await Link.findOne({ back_half });
            if (existingBackHalf) {
                return next(errorHandler(400, 'Back half already exists'));
            }

            const newLink = new Link({
                url,
                shortUrl: back_half,
                title,
                user: id,
                logo
            });
            await newLink.save();
            const qrCode = new QrCode({
                url,
                properties,
                shortUrl: back_half,
                title,
                user: id
            });
            await qrCode.save();
            res.status(201).json({ message: 'QR created successfully' });
        } else {

            const shortUrl = generateHashedString(username);
            const newLink = new Link({
                url,
                shortUrl,
                title,
                user: id,
                logo
            });
            await newLink.save();
            const qrCode = new QrCode({
                url,
                properties,
                shortUrl,
                title,
                user: id
            });
            await qrCode.save();
            res.status(201).json({ message: 'QR created successfully' });
        }

    }
    catch (error) {
        console.log(error);
        next(errorHandler(400, error.message));
    }
}

async function getQrCodes(req, res, next) {
    const { id } = req.user;
    try {
        const qrCodes = await QrCode.find({ user: id });
        res.status(200).json({ qrCodes });
    } catch (error) {
        next(errorHandler(400, error.message));
    }
}

async function getQrCode(req, res, next) {
    const { id } = req.params;
    try {
        const qrCode = await QrCode.findById(id);
        res.status(200).json({ qrCode });
    } catch (error) {
        next(errorHandler(400, error.message));
    }
}

module.exports = {
    createQrCode,
    getQrCodes
};