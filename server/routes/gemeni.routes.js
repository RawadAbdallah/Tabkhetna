const express = require("express");
const generateRecipeMissingInfo = require("../controllers/gemeni.controller");

const router = express.Router();

router.post("/generateRecipeMissingInfo", generateRecipeMissingInfo);

module.exports = router;
