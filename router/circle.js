const Router = require('koa-router')
const circleController = require('../controller/circle.controller.js')
const circle = new Router()

circle.get('/getCircle',circleController.getCircleInfo);
circle.get('/getMyCircle',circleController.getMyCircle);
circle.get('/getCircleByName',circleController.getCircleByName);
module.exports = circle;