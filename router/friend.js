const Router = require('koa-router')
const friendController = require('../controller/friend.controller.js')
const friend = new Router()

friend.get('/getFriends',friendController.getFriends);

module.exports = friend;