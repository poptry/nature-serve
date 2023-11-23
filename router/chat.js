const Router = require('koa-router')
const chatController = require('../controller/chat.controller.js')
const chat = new Router()

chat.get('/getMsgs',chatController.getMsgs);
module.exports = chat;