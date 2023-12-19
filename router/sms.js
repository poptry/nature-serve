const Router = require('koa-router')
const register = new Router()
const redis = require('../util/redis.js')
const Core = require('@alicloud/pop-core');
// 随机验证码
function ran(num) {
    let code = "";
    for (let i = 0; i < num; i++) {
        let radom = Math.floor(Math.random() * 10);
        code += radom
    }
    return {
        "code": code
    }
}
register.post('/note', async (ctx, next) => {
    const {phone} = ctx.request.body;
    console.log(phone);
    var client = new Core({
        accessKeyId: 'LTAI5t9i3wdYSSKvVLuKperp',
        accessKeySecret:  'i9vBHL0Ul1S9wyK86kXXld50OxpXoh',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });
    const randCode = ran(6);
    var params = {
        "PhoneNumbers": phone,
        "SignName": "Explorer",
        "TemplateCode": "SMS_464400402",
        "TemplateParam": JSON.stringify(randCode)
    }
    var requestOption = {
        method: 'POST',
        formatParams: false,
    };
    try {
        const response = await client.request('SendSms', params, requestOption)
        console.log('response', response)
        if (response.Code === 'OK') {
            redis.set(phone, randCode.code,'EX',5*60) //手机号和验证码存入redis
            ctx.body = {
                code: '200',
                message: '发送成功'
            }
        } else {
            ctx.body = {
                code: '400',
                message: '发送失败'
            }
        }
    } catch (error) {
        ctx.body={
            code:'405',
            message:'发送频繁'
        }
    }

})
module.exports = register