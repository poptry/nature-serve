const {createUser,getUser,updateAvatar} = require('../service/user.service')
const client = require('../util/oss_init.js')
class userController{
    //登录
    async login(ctx,next){
        const req_user = ctx.request.query
        console.log(req_user);
        ctx.body =  JSON.stringify(await getUser(req_user))
    }
    //注册
    async addUser(ctx,next){
        //https://blog.csdn.net/The_Lucky_one/article/details/105151568
        const {user_name,user_pwd,user_age,user_sex,user_id,user_motto,user_city,user_avatar} = ctx.request.body
        const res = await createUser(user_name,user_id,user_pwd,user_age,user_sex,user_motto,user_city,user_avatar)
        ctx.body = {
            code:200,
            message:'添加用户成功',

        }
    }
    //更改信息
    async updateUserAvatar(ctx,next){
        try {
                const file = ctx.request.files.file;
                const timeStamp = Date.now()
                const userInfo = ctx.request.body
                let name = `/avatar/${timeStamp}u${userInfo.user_id}.JPG`
                const result = await client.put(name,`${file.filepath}`,{
                headers:{
                    'x-oss-storage-class': 'Standard',
                    'x-oss-object-acl': 'private',
                    'Content-Disposition': 'inline',
                    'content-type': 'image/jpg'
                }})
                let {user_id} = {...userInfo}
                let newValue = {user_id,url:result.url,}
                console.log(newValue);
                const res = await updateAvatar(newValue)
                ctx.body = {
                    code:200,
                    url:result.url,
                }
            } catch (error) {
                ctx.body = {
                    code:400
                }
            }
    }
}
module.exports = new userController()
