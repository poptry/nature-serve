const Router = require('koa-router')
const friendController = require('../controller/friend.controller.js')
const friend = new Router()

friend.get('/getFriends',friendController.getFriends);
friend.post('/addFriend',friendController.addFriend);
friend.get('/getApply',friendController.getApply);
friend.get('/isApply',friendController.isApply);
friend.post('/agreeApply',friendController.agreeApply);
friend.post('/refuseApply',friendController.refuseApply);
module.exports = friend;