const router = require('express').Router()

const authRoute = require('./auth')
const profileRoute = require('./profile')
const eventRoute = require('./events')

router.use('/auth', authRoute)
router.use('/profile', profileRoute)
router.use('/event', eventRoute)

module.exports = router
