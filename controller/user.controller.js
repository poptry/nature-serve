const {createUser,getUser,updateAvatar,updateUserWantInfo,getUserInfo,updateUserHobby,updateOther} = require('../service/user.service')
const client = require('../util/oss_init.js')
const redis = require('../util/redis.js')
class userController{
    //登录
    async login(ctx,next){
        const req_user = ctx.request.query
        ctx.body =  JSON.stringify(await getUser(req_user))
    }
    //更改信息
    async updateUserAvatar(ctx,next){
        try {
            const file = ctx.request.files.file;
            const timeStamp = Date.now()
            let {userInfo} = ctx.request.body
            userInfo = JSON.parse(userInfo)
            console.log(userInfo);
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
            const res = await updateAvatar(newValue)
            ctx.body = {
                code:200,
                url:result.url,
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code:400
            }
        }
    }
    //更改用户want信息
    async updateUserWantInfo(ctx,next){
        let newValue = ctx.request.body
        const res = await updateUserWantInfo(newValue)
        ctx.body = {
            code:200,
            message:'更新成功'
        }
    }
    //获取用户信息
    async getUserInfo(ctx,next){
        let {user_id} = ctx.request.query
        console.log(user_id);
        const res = await getUserInfo(user_id)
        ctx.body = {
            code:200,
            data:res
        }
    }
    //更新用户爱好特长
    async updateUserHobby(ctx,next){
        let newValue = ctx.request.body
        const res = await updateUserHobby(newValue)
        ctx.body = {
            res
        }
    }
    //更改用户其它信息
    async updateOther(ctx,next){
        let newValue = ctx.request.body
        const res = await updateOther(newValue)
        ctx.body = {
            res
        }
    }
    
    //注册用户
    async registerNewUser(ctx, next){
        let {registerInfo} = ctx.request.body; //获取注册信息
        registerInfo = JSON.parse(registerInfo)
        const file = ctx.request.files.file;
        const timeStamp = Date.now()
        let name = `/avatar/${timeStamp}u${registerInfo.userPhone}.JPG`
        const result = await client.put(name,`${file.filepath}`,{
            headers:{
                'x-oss-storage-class': 'Standard',
                'x-oss-object-acl': 'private',
                'Content-Disposition': 'inline',
                'content-type': 'image/jpg'
        }})
        registerInfo.user_avatar = result.url
        try {
            let flag = 0
            await redis.get(registerInfo.user_phone).then((res) => {
                console.log(res);
                if(res == registerInfo.user_code){
                    flag = 1
                }else{
                    flag = 0
                }
            })
            if(flag == 0){
                ctx.body = {
                    code:400,
                    msg:'验证码错误'
                }
                return
            }else{
                ctx.body = JSON.stringify(await createUser(registerInfo))
            }
        } catch (error) {
            console.log(error);
        }

    }
}
module.exports = new userController()
