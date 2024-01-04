const express = require('express')
const { addCookmate, acceptCookmate, rejectCookmate, getCookmates } = require('../controllers/user.controller')
const router = express.Router()

router.post('/add/:id', addCookmate)
router.post('/accept/:id', acceptCookmate)
router.post('/reject/:id', rejectCookmate)
router.get('/', getCookmates)

module.exports = router
