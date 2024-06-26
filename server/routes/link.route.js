const express = require("express");
const {
    shortenLink,
    deleteLink,
    updateLink,
    getLinks,
    getLinkDetails,
} = require("../controllers/link.controller");

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Welcome to the link route');
// });

router.post("/shorten", shortenLink);
router.delete("/:shortUrl", deleteLink);
router.put("/:shortUrl", updateLink);
router.get("/getDetails/:shortUrl", getLinkDetails);
router.get("/getLinks", getLinks);
module.exports = router;
