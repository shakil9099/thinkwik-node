const router = require('express').Router()

const { multer } = require('../../../utils')
const controllers = require('./lib/controllers')
const middlewares = require('./lib/middlewares')

router.use(middlewares.isAuthenticated)

router.get('/view', controllers.get)
router.post('/update', controllers.update)
router.post('/update/proPic', multer.uploadProPic('sProPic'), controllers.uploadPic)

module.exports = router
   