const router = require('express').Router()
const controllers = require('./lib/controllers')
const { isAuthenticated } = require('./lib/middlewares')

router.use(isAuthenticated)
router.post('/create', controllers.create)
router.get('/list', controllers.list)
router.get('/join/:iEventId', controllers.join)
router.get('/leave/:iEventId', controllers.leave)
router.get('/participants/:iEventId', controllers.participants)
router.get('/creator/:iEventId', controllers.creatorInfo)

module.exports = router
