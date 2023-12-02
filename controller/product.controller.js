const {getPros,getMenPros,getWomenPros} = require('../service/product.service')

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
}
module.exports = new proController()
