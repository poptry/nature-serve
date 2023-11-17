const circleModel = require('../db/model/circle.model.js')
const sequelize = require('../db/dbConn.js');
const sql=`
    SELECT c.*,user_avatar
    FROM circle c
    LEFT JOIN user u ON c.circle_owner=user_id`;
class circleService{
    async getCircle(){
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new circleService()