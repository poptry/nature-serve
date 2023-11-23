const sequelize = require('../db/dbConn.js');

class friendService{
    async getFriends(user_id){
        const sql = `SELECT u.*
        FROM user u 
        LEFT JOIN friend f ON u.user_id = f.frienduser1_id
        WHERE f.frienduser2_id = ${user_id}
        
        UNION
        
        SELECT u.*
        FROM user u 
        LEFT JOIN friend f ON u.user_id = f.frienduser2_id
        WHERE f.frienduser1_id = ${user_id};`
        
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
