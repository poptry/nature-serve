// const {sequelize,Op} = require('../db/dbConn.js');
const {Sequelize} = require('sequelize')
const CollectionModel = require('../db/model/collection.model.js')
class CollectionService{
    async getCollectionDetail(strategy_collection_ids){
        console.log(typeof strategy_collection_ids);
        const res = await CollectionModel.findAll({
            where:{
                strategy_collection_id:{
                    [Sequelize.Op.in]: strategy_collection_ids
                }}
        })
        return res;
    }
}
module.exports = new CollectionService()
