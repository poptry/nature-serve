
const sequelize = require('../db/dbConn.js');
const strategyCollectionModel = require('../db/model/strategyCollection.model.js')
class strategyCollectionService{
    async getStrategyCollection(city){
        const res = await strategyCollectionModel.findAll({
            where:{city:city}
        })
        return res;
    }
}
module.exports = new strategyCollectionService()
