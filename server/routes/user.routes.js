const express = require('express')
const { addCookmate, acceptCookmate, rejectCookmate, getCookmates } = require('../controllers/user.controller')
const router = express.Router()

router.post('/add/:id', addCookmate)
router.post('/accept/:id', acceptCookmate)
router.post('/reject/:id', rejectCookmate)
router.get('/', getCookmates) // this is giving me an error  Route.get() requires a callback function but got a [object Undefined]

module.exports = router
