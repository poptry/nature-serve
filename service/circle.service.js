const circleModel = require('../db/model/circle.model.js')
const sequelize = require('../db/dbConn.js');

class circleService{
    //获取所有的圈子
    async getCircle(){
        const sql=`
        SELECT c.*
        FROM circle c`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //获取当前用户加入的圈子
    async getMyCircle(user_id){
        const sql = `
        SELECT * 
        FROM circle c
        LEFT JOIN user_circle uc on c.circle_id = uc.circle_id
        WHERE uc.user_id =:user_id
        `;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { user_id: user_id }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //模糊查询圈子
    async getCircleByName(circleName){
        const sql = `SELECT * FROM circle c
        WHERE c.circle_name LIKE :circleName`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { circleName: `%${circleName}%` }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new circleService()