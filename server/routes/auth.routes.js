const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const upload = require("../configs/multer.config");
const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single('profile_pic'), register);

module.exports = router;
