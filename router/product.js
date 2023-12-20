const Router = require('koa-router')
const proController = require('../controller/product.controller.js')
const product = new Router()
//获取所有商品
product.get('/getPros',proController.getPros);
product.get('/getMenPros',proController.getMenPros);
product.get('/getWomenPros',proController.getWomenPros);
product.get('/getShopCart',proController.getShopCart);
product.post('/addShopCart',proController.addShopCart);
product.post('/deleteShopCart',proController.deleteShopCart);
product.get('/findShopCart',proController.findShopCart);
product.post('/updateShopCart',proController.updateShopCart);
product.get('/getOrders',proController.getOrders)
product.get('/getProById',proController.getProById) // 通过id获取商品信息
product.post('/pay',proController.pay) // 订单支付
module.exports = product;