const userModel = require('../db/model/user.model.js')
class UserService{
    async createUser(user_name,user_id,user_pwd,user_age,user_sex){
        console.log(user_name,user_id,user_pwd,user_age,user_sex);
        const res = await userModel.create({user_name,user_id,user_pwd,user_age,user_sex})
        return res.dataValues;
    }
    async getUser(user){
        const res = await userModel.findAll({
            where:{user_id:user.userId,user_pwd:user.userPwd}
        })
        return res;
    }
}
module.exports = new UserService()