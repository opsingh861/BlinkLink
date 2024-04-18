
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');



const signup = async (req, res, next) => {
    const { name, username, email, password } = req.body;
    try {
        // check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) return next(errorHandler(400, 'User already exists'));
        existingUser = await User.findOne({ username });
        if (existingUser) return next(errorHandler(400, 'Username already exists'));
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword
        }); // This is where you have 'F' character which might be causing the issue
        await user.save();
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        
        // Ensure validUser is properly defined with the password property
        const { password: userPassword, ...rest } = user._doc;
        
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        console.log(token)
        return res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
        })
            .status(201).json({ data: rest, message: 'User created successfully' });
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};


const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
        const token = jwt.sign({ id: validUser._id, username: validUser.username }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        console.log(token)
        return res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
        })
            .status(200)
            .json(rest);
    } catch (error) {
        next(errorHandler(400, error.message));
    }
};

const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new User({
                name: req.body.name,
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res
                .cookie('access_token', token, {
                    httpOnly: true,
                    expires: expiryDate,
                })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
};

module.exports = {
    signup,
    login,
    google,
    logout
};