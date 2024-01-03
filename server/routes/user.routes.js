const express = require('express')
const { addCookmate, acceptCookmate, rejectCookmate } = require('../controllers/user.controller')
const router = express.Router()

router.post('/add/:id', addCookmate)
router.post('/accept/:id', acceptCookmate)
router.post('/reject/:id', rejectCookmate)


module.exports = router
