const express = require("express");
const {
    addCookmate,
    acceptCookmate,
    rejectCookmate,
    getCookmates,
    getCurrentUserProfile,
    getOtherUserProfile,
    getTopCookmates,
    getProfileBasicInfo
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/cookmates/add/:id", addCookmate);
router.post("/cookmates/accept/:id", acceptCookmate);
router.post("/cookmates/reject/:id", rejectCookmate);
router.get("/cookmates", getCookmates);
router.get('/cookmates/top/:id', getTopCookmates)
router.get("/profile/:userId", getOtherUserProfile);
router.get('/profile/basicInfo/:id', getProfileBasicInfo)

module.exports = router;
