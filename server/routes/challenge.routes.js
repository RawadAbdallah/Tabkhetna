const express = require("express");
const {getChallenges,createChallenge, participateChallenge} = require('../controllers/challenge.controller')
const router = express.Router()
router.get('/', getChallenges)
router.post('/new', createChallenge)
router.post('/participate/:challengeId', participateChallenge)

module.exports = router;
