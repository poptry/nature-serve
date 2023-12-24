
const sequelize = require('../db/dbConn.js');
const strategyCollectionModel = require('../db/model/strategyCollection.model.js')
class strategyCollectionService{
    async getStrategyCollection(city){
        const res = await strategyCollectionModel.findAll()
        return res;
    }
    //查询攻略内容
    async getStrategyContent(collection_id){
        const sql = `select * from strategy_txt where collection_id=:collection_id;`
        try {
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements:{collection_id:collection_id}
            })
            return res;
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = new strategyCollectionService()
