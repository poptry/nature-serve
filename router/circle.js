const Router = require('koa-router')
const circleController = require('../controller/circle.controller.js')
const circle = new Router()

circle.get('/getCircle',circleController.getCircleInfo);
circle.get('/getMyCircle',circleController.getMyCircle);
circle.get('/getCircleByName',circleController.getCircleByName);
circle.get('/getCircleMembers',circleController.getCircleMembers);
circle.get('/getCircleOwner',circleController.getCircleOwner);
circle.get('/getCircleChat',circleController.getCircleChat);
circle.post('/joinCircle',circleController.joinCircle);
circle.post('/createMyCircle',circleController.createMyCircle);
circle.post('/quitCircle',circleController.quitCircle);
circle.post('/kickOutCircle',circleController.kickOutCircle);
module.exports = circle;