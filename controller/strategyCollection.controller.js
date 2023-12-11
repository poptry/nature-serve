const {getStrategyCollection} = require('../service/strategyCollection.service')

class strategyCollectionController{
    async getStrategyCollection(ctx,next){
        const {city} = ctx.request.query
        ctx.body =  JSON.stringify(await getStrategyCollection(city))
    }
}
module.exports = new strategyCollectionController()
