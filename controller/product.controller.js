const {getPros,pay,getProById,getMenPros,getWomenPros,getShopCart,addShopCart,deleteShopCart,findShopCart,updateShopCart,getOrders} = require('../service/product.service')

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
    //更新商品数量
    async updateShopCart(ctx,next){
        const data =ctx.request.body
        ctx.body  = JSON.stringify(await updateShopCart(data))
    }
    //添加购物车
    async addShopCart(ctx,next){
        const params = ctx.request.body
        ctx.body =  JSON.stringify(await addShopCart(params))
    }
    //删除购物车
    async deleteShopCart(ctx,next){
        const params = ctx.request.body
        ctx.body =  JSON.stringify(await deleteShopCart(params))
    }
    //查询该商品是否被用户加入购物车
    async findShopCart(ctx,next){
        const params = ctx.request.query
        ctx.body =  JSON.stringify(await findShopCart(params))
    }
    //查询订单
    async getOrders(ctx,next){
        const params = ctx.request.query
        console.log(params);
        ctx.body = JSON.stringify(await getOrders(params))
    }
    //通过id查询商品
    async getProById(ctx,next){
        const {product_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getProById(product_id))
    }
    //订单支付
    async pay(ctx,next){
        const params = ctx.request.body
        ctx.body = JSON.stringify(await pay(params))
    }
}
module.exports = new proController()
