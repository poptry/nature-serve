const {getPros,getMenPros,getWomenPros,getShopCart} = require('../service/product.service')

class proController{
    //获取商品列表
    async getPros(ctx,next){
        const params = ctx.request.query
        ctx.body =  JSON.stringify(await getPros(params))
    }
    // getMenPros
    async getMenPros(ctx,next){
        const params = ctx.request.query
        ctx.body =  JSON.stringify(await getMenPros(params))
    }
    // getWomenPros
    async getWomenPros(ctx,next){
        const params= ctx.request.query
        ctx.body =  JSON.stringify(await getWomenPros(params))
    }
    //获取用户购物车信息
    async getShopCart(ctx,next){
        const {user_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getShopCart(user_id))
    }
}
module.exports = new proController()
