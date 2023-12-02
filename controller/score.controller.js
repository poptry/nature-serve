const {getScoreByPro,getScoreByUser,addScore} = require('../service/score.service')

class scoreController{
    //获取评分
    async getScoreByPro(ctx,next){
        const {product_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getScoreByPro(product_id))
    }
    //获取用户对于某商品的评分
    async getScoreByUser(ctx,next){
        const {product_id,user_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getScoreByUser(product_id,user_id))
    }
    //提交用户对于某商品的评分
    async addScore(ctx,next){
        const {product_id,user_id,score_number} = ctx.request.body
        ctx.body =  JSON.stringify(await addScore(product_id,user_id,score_number))
    }
}
module.exports = new scoreController()
