const {getCircle,getMyCircle,getCircleByName,getCircleMembers,getCircleOwner,getCircleMsg,joinCircle} = require('../service/circle.service')

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
    //根据圈子id查询圈子所有的成员
    async getCircleMembers(ctx,next){
        const {circle_id} = ctx.request.query
        ctx.body = JSON.stringify(await getCircleMembers(circle_id))
    }
    //根据圈子的id获取圈主的信息
    async getCircleOwner(ctx,next){
        const {circle_id} = ctx.request.query
        ctx.body = JSON.stringify(await getCircleOwner(circle_id))
    }
    //获取圈子的聊天记录
    async getCircleChat(ctx,next){
        const {circle_id} = ctx.request.query
        ctx.body = JSON.stringify(await getCircleMsg(circle_id))
    }
    //加入圈子
    async joinCircle(ctx,next){
        const {user_id,circle_id} = ctx.request.body
        const res = await joinCircle(user_id,circle_id)
        console.log(res);
        ctx.body = JSON.stringify(res)
    }
}
module.exports = new userController()
