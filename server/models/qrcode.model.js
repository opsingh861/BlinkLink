const mongoose = require('mongoose');



const qrCodeSchema = new mongoose.Schema({
    properties: {
        type: Object,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const QrCode = mongoose.model('QrCode', qrCodeSchema);

module.exports = QrCode;