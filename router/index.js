const Router = require('koa-router')
const router = new Router()
const user = require('./user/user.js')

router.use('/user',user.routes(),user.allowedMethods())
module.exports = router