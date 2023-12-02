const Router = require('koa-router')
const scoreController = require('../controller/score.controller.js')
const score = new Router()

score.get('/getScoreByPro',scoreController.getScoreByPro);
score.get('/getScoreByUser',scoreController.getScoreByUser);
score.post('/addScore',scoreController.addScore);
module.exports = score;