const Router = require('koa-router')
const proController = require('../controller/product.controller.js')
const product = new Router()
//获取所有商品
product.get('/getPros',proController.getPros);
product.get('/getMenPros',proController.getMenPros);
product.get('/getWomenPros',proController.getWomenPros);
product.get('/getShopCart',proController.getShopCart);
module.exports = product;