const express = require("express")
const {
    createQrCode,
    getQrCodes,
    getQrCode,
} = require("../controllers/qr.controller")

const router = express.Router()

router.post("/create", createQrCode)
router.get("/getQrs", getQrCodes)
router.get("/getQr/:shortUrl", getQrCode)

module.exports = router
