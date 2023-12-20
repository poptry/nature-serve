const Router = require('koa-router')
const userController = require('../controller/user.controller.js')
const client = require('../util/oss_init.js')
const user = new Router()
const path = require('path')

user.get('/',(ctx)=>{
    ctx.body = "hello koa"
});

user.get('/login',userController.login)
user.post('/upload',async ctx => {
  try {
    const file = ctx.request.files.file;
    const userInfo = ctx.request.body
    let name = `/avatar/${userInfo.user_id}.JPG`
    const result = await client.put(name,`${file.filepath}`,{
      headers:{
      'x-oss-storage-class': 'Standard',
      'x-oss-object-acl': 'private',
      'Content-Disposition': 'inline',
      'content-type': 'image/jpg'
    }
  })
    ctx.body = {
      code:200,
      url:result.url,
    }
  } catch (error) {
    console.log(error);
  }
})
user.get('/getUserInfo',userController.getUserInfo)
user.post('/updateAvatar',userController.updateUserAvatar)
user.post('/updateUserWantInfo',userController.updateUserWantInfo)
user.post('/updateUserHobby',userController.updateUserHobby)
user.post('/updateOther',userController.updateOther)
user.post('/registerNewUser',userController.registerNewUser)
user.get('/getUserByPhone',userController.getUserByPhone)
module.exports = user;