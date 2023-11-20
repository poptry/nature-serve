const Router = require('koa-router')
const router = new Router()
const user = require('./user.js')
const circle = require('./circle.js')

router.use('/user',user.routes(),user.allowedMethods())
router.use('/circle',circle.routes(),circle.allowedMethods())

module.exports = router