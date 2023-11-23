const userModel = require('../db/model/user.model.js')
const sequelize = require('../db/dbConn.js');

class UserService{
    async createUser(user_name,user_id,user_pwd,user_age,user_sex,user_motto,user_city,user_avatar){
        const res = await userModel.create({user_name,user_pwd,user_age,user_sex,user_id,user_motto,user_city,user_avatar})
        return res.dataValues;
    }
    async getUser(user){
        const res = await userModel.findAll({
            where:{user_id:user.userId,user_pwd:user.userPwd}
        })
        return res;
    }
    async updateAvatar(newValue) {
        const { user_id, url } = newValue; // 假设 newValue 包含了用户ID和新的头像信息
        const sql = `
            UPDATE user
            SET user_avatar = "${url}"
            WHERE user_id = "${user_id}"
        `;
        try {
            const res = await sequelize.query(sql, {
                replacements: {
                    userAvatar: url, // 使用 newValue 中的 user_avatar
                    userId: user_id // 使用 newValue 中的 user_id
                },
                type: sequelize.QueryTypes.UPDATE
            });
            return {
                code:200,
                msg:'更新成功'
            }
        } catch (error) {
            return {
                code:404,
                msg:'更新有误'
            }
        }
    }
    
}
module.exports = new UserService()