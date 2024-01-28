const {getMessages, sendMessage} = require("../controllers/message.controller");
const express = require("express");
const router = express.Router();

router.get("/:receiver", getMessages);
router.post("/", sendMessage);

module.exports = router;
