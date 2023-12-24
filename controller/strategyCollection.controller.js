const {getStrategyCollection,getStrategyContent} = require('../service/strategyCollection.service')

class strategyCollectionController{
    async getStrategyCollection(ctx,next){
        const {city} = ctx.request.query
        ctx.body =  JSON.stringify(await getStrategyCollection(city))
    }
    //获取详细攻略
    async getStrategyContent(ctx,next){ 
        const {collection_id} = ctx.request.query
        ctx.body = JSON.stringify(await getStrategyContent(JSON.parse(collection_id)))
    }
}
module.exports = new strategyCollectionController()
