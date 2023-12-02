const scoreModel = require('../db/model/score.model.js')
const productModel = require('../db/model/product.model.js')
const sequelize = require('../db/dbConn.js');

class ScoreService{
    async getScoreByPro(product_id){
        const res = await productModel.findAll({
            where:{product_id:product_id}
        })
        return res;
    }
    //获取用户对于某商品的评分
    async getScoreByUser(product_id,user_id){
        const res = await scoreModel.findAll({
            where:{product_id:product_id,user_id:user_id}
        })
        return res;
    }
    //提交用户对于某商品的评分
    async addScore(product_id,user_id,score_number){
        const res = await scoreModel.create({
            product_id:product_id,
            user_id:user_id,
            score_number:score_number
        })
        return res;
    }
}
module.exports = new ScoreService()