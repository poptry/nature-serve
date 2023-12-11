const Router = require('koa-router')
const strategyCollectionController = require('../controller/strategyCollection.controller.js')
const CollectionController = require('../controller/collection.controller.js')
const strategy = new Router()

strategy.get('/getStrategyCollection',strategyCollectionController.getStrategyCollection);
strategy.post('/getCollectionDetail',CollectionController.getCollectionDetail);
module.exports = strategy;