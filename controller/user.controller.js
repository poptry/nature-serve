const {createUser,getUser} = require('../service/user.service')

class userController{
    async getUser(ctx,next){
        ctx.body =  JSON.stringify(await getUser())
    }
    async addUser(ctx,next){
        //https://blog.csdn.net/The_Lucky_one/article/details/105151568
        const {user_name,user_pwd,user_age,user_sex,user_id} = JSON.parse(ctx.request.body)
        console.log(user_name,user_pwd,user_age,user_sex,user_id);
        const res = await createUser(user_name,user_id,user_pwd,user_age,user_sex)
        ctx.body = {
            code:200,
            message:'添加用户成功',
            result:{
                
            }
        }
    }
}
module.exports = new userController()
