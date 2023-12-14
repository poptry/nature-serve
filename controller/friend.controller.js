const {getFriends,addFriend,getApply,isApply,agreeApply,refuseApply} = require('../service/friend.service')

class userController{
    async getFriends(ctx,next){
        const {user_id} = ctx.request.query
        console.log(user_id);
        ctx.body =  JSON.stringify(await getFriends(user_id))
    }
    //添加好友
    async addFriend(ctx,next){
        const {user_id,friend_id} = ctx.request.body
        ctx.body =  JSON.stringify(await addFriend(user_id,friend_id))
    }
    //好友申请
    async getApply(ctx,next){
        const {user_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getApply(user_id))
    }
    //查看是否申请过了 isApply
    async isApply(ctx,next){
        const {user_id,friend_id} = ctx.request.query
        ctx.body =  JSON.stringify(await isApply(user_id,friend_id))
    }
    //同意好友申请
    async agreeApply(ctx,next){
        const {user_id,friend_id} = ctx.request.body
        ctx.body = JSON.stringify(await agreeApply(user_id,friend_id))
    }
    //拒绝好友申请
    async refuseApply(ctx,next){
        const {user_id,friend_id} = ctx.request.body
        ctx.body = JSON.stringify(await refuseApply(user_id,friend_id))
    }
}
module.exports = new userController()
