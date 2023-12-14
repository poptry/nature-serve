const sequelize = require('../db/dbConn.js');

class friendService{
    async getFriends(user_id){
        const sql = `SELECT u.*
        FROM user u 
        LEFT JOIN friend f ON u.user_id = f.frienduser1_id
        WHERE f.frienduser2_id = ${user_id} and f.friend_status = 1
        
        UNION
        
        SELECT u.*
        FROM user u 
        LEFT JOIN friend f ON u.user_id = f.frienduser2_id
        WHERE f.frienduser1_id = ${user_id} and f.friend_status = 1;`
        
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //添加好友
    async addFriend(user_id,friend_id){
        //获取当前时间戳
        let timestamp = Date.now();
        const sql = `INSERT INTO friend(frienduser1_id,frienduser2_id,created_at)
        VALUES(${user_id},${friend_id},${timestamp})`
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.INSERT
            })
            return {
                code:200,
                res
            };
        }catch(error){
            console.log(error);
        }
    }
    //查询待我同意的好友申请
    async getApply(user_id){
        const sql = `SELECT u.*
        FROM friend f 
        LEFT JOIN user u  ON u.user_id = f.frienduser1_id
        WHERE f.friend_status = 0 and f.frienduser2_id = :user_id;`
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
    //查看该用户是否是我申请了的
    async isApply(user_id,friend_id){
        const sql = `select * 
        from friend 
        where frienduser1_id = :user_id and frienduser2_id = :friend_id;`
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { user_id: user_id,friend_id:friend_id }
            })
            return {
                code:200,
                res
            };
        }catch(error){
            return {
                code:500,
                msg:'查询失败'
            }
        }
    }
    //同意好友申请
    async agreeApply(user_id,friend_id){
        const sql = `UPDATE friend SET friend_status = 1 WHERE frienduser1_id = ${friend_id} and frienduser2_id = ${user_id}`
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.UPDATE
            })
            return {
                code:200,
                msg:"同意成功"
            }
        }catch(error){
            return {
                code:400,
                msg:"同意失败"
            }
        }
    }
    //拒绝好友申请
    async refuseApply(user_id,friend_id){
        const sql = `DELETE FROM friend WHERE frienduser1_id = ${friend_id} and frienduser2_id = ${user_id}`
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.DELETE
            })
            return {
                code:200,
                msg:"拒绝成功"
            }
        }catch(error){
            return {
                code:400,
                msg:"拒绝失败"
            }
        }
    }
}
module.exports = new friendService()
