const express = require("express");
const {getChallenges,createChallenge, participateChallenge} = require('../controllers/challenge.controller');
const { upload } = require("../configs/multer.config");
const router = express.Router()
router.get('/', getChallenges)
router.post('/new', upload.single('challengeImg'), createChallenge)
router.post('/participate/:challengeId', participateChallenge)

module.exports = router;