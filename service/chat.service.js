
const sequelize = require('../db/dbConn.js');

class chatService{
    async getMsgs(send_id,receive_id){
        const sql = ` SELECT * 
        FROM chat c
        LEFT JOIN user u on c.chat_send_id=u.user_id
        WHERE (c.chat_send_id = :send_id or c.chat_send_id = :receive_id) and (c.chat_receive_id = :receive_id or c.chat_receive_id = :send_id)`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements:{
                    send_id:send_id,
                    receive_id:receive_id
                }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new chatService()
