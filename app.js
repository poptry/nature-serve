const Koa = require('koa');
const router = require('./router');
const app = new Koa()
const cors = require("koa2-cors") //引入跨域
const {APP_PORT} = require('./config/config.default') //引入全局变量
const {koaBody} = require('koa-body')

//https://segmentfault.com/q/1010000040670135 跨域
app.use(cors({
    origin: function(ctx) {
      return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE','PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }));

app.use(koaBody({multipart:true})).use(router.routes(),router.allowedMethods())

app.listen(APP_PORT,()=>{
    console.log(`http://localhost:${APP_PORT}`);
})