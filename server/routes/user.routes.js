const express = require('express')
const { addCookmate, acceptCookmate } = require('../controllers/user.controller')
const router = express.Router()

router.post('/add/:id', addCookmate)
router.post('/accept/:id', acceptCookmate)

module.exports = router
