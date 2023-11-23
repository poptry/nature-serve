const {getCircle,getMyCircle,getCircleByName} = require('../service/circle.service')

class userController{
    async getCircleInfo(ctx,next){
        ctx.body =  JSON.stringify(await getCircle())
    }
    //获取当前用户的所有加入的圈子
    async getMyCircle(ctx,next){
        const {user_id} = ctx.request.query
        console.log(user_id);
        ctx.body =  JSON.stringify(await getMyCircle(user_id))
    }
    //根据名称查询圈子
    async getCircleByName(ctx,next){
        const {circleName} = ctx.request.query
        ctx.body = JSON.stringify(await getCircleByName(circleName))
    }
}
module.exports = new userController()
