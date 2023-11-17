const {getCircle} = require('../service/circle.service')

class userController{
    async getCircleInfo(ctx,next){
        ctx.body =  JSON.stringify(await getCircle())
    }
}
module.exports = new userController()
