const express = require('express');
const { createQrCode, getQrCodes } = require('../controllers/qr.controller');

const router = express.Router();


router.post('/create', createQrCode);
router.get('/getQrs', getQrCodes)

module.exports = router;