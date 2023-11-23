const {getFriends} = require('../service/friend.service')

class userController{
    async getFriends(ctx,next){
        const {user_id} = ctx.request.query
        console.log(user_id);
        ctx.body =  JSON.stringify(await getFriends(user_id))
    }
}
module.exports = new userController()
