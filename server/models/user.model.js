const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://th.bing.com/th/id/R.0771e184dbb04e47c667d38c6e6bb6df?rik=sprfZaNYE%2bvU1A&riu=http%3a%2f%2fgymkhana.iitb.ac.in%2f%7esports%2fimages%2fprofile.png&ehk=QeYO2n9hr6iOCpGjMhFFocMp3a84UVyrE1IADVb3oHA%3d&risl=&pid=ImgRaw&r=0'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        default: 'basic'
    },
    planExpires: {
        type: Date
    },
    planCreatedAt: {
        type: Date
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);


module.exports = User;