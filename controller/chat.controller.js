const {getMsgs} = require('../service/chat.service')

class userController{
    async getMsgs(ctx,next){
        const {sendId,recevieId} = ctx.request.query
        ctx.body =  JSON.stringify(await getMsgs(sendId,recevieId))
    }
}
module.exports = new userController()
