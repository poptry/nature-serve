const sequelize = require('../db/dbConn.js');

class friendService{
    async getFriends(user_id){
        const sql = `SELECT u.*
        From user u 
        left join friend f on u.user_id = f.frienduser2_id
        WHERE f.frienduser1_id = ${user_id}`
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
module.exports = new friendService()
