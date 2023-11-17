const Router = require('koa-router')
const userController = require('../controller/user.controller.js')
const user = new Router()

user.get('/',(ctx)=>{
    ctx.body = "hello koa"
});
user.get('/login',userController.login)
user.post('/addUser',userController.addUser)
module.exports = user;