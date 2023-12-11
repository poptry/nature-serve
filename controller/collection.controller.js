const {getCollectionDetail} = require('../service/collection.service.js')

class CollectionController{
    async getCollectionDetail(ctx,next){
        const {strategyCollectionIds} = ctx.request.body
        console.log(strategyCollectionIds);
        ctx.body =  JSON.stringify(await getCollectionDetail(strategyCollectionIds))
    }
}
module.exports = new CollectionController()
