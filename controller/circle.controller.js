const {getCircle,getMyCircle,getCircleByName,getCircleMembers,getCircleOwner,getCircleMsg,joinCircle,createMyCircle,quitCircle,kickOutCircle,getNewCircle} = require('../service/circle.service')
const client = require('../util/oss_init.js')
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
    //创建圈子
    async createMyCircle(ctx,next){
        try {
            const file = ctx.request.files.file;
            const file2 = ctx.request.files.file2;
            const timeStamp = Date.now()
            let {createCircleInfo} = ctx.request.body
            createCircleInfo = JSON.parse(createCircleInfo)
            let name = `/circle/circleCover/${timeStamp}cc${createCircleInfo.circle_owner}.JPG`
            let name2 = `/circle/circleHead/${timeStamp}ch${createCircleInfo.circle_owner}.JPG`
            const result = await client.put(name,`${file.filepath}`,{
                headers:{
                    'x-oss-storage-class': 'Standard',
                    'x-oss-object-acl': 'private',
                    'Content-Disposition': 'inline',
                    'content-type': 'image/jpg'
                }})
            const result2 = await client.put(name2,`${file2.filepath}`,{
                headers:{
                    'x-oss-storage-class': 'Standard',
                    'x-oss-object-acl': 'private',
                    'Content-Disposition': 'inline',
                    'content-type': 'image/jpg'
                }})
            createCircleInfo.circle_preview = result.url
            createCircleInfo.circle_avatar = result2.url
            const res = await createMyCircle(createCircleInfo)
            const res2 = await getNewCircle()
            const res3 = await joinCircle(createCircleInfo.circle_owner,res2[0].circle_id)
            ctx.body = {
                code:200,
                res,
                res3
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code:400
            }
        }
    }
    //退出圈子
    async quitCircle(ctx,next){
        const {user_id,circle_id} = ctx.request.body
        ctx.body = JSON.stringify(await quitCircle(user_id,circle_id))
    }
    //踢出圈子
    async kickOutCircle(ctx,next){
        const {user_id,circle_id} = ctx.request.body
        ctx.body = JSON.stringify(await kickOutCircle(user_id,circle_id))
    }
}
module.exports = new userController()
