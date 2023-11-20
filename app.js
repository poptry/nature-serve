const Koa = require('koa');
const router = require('./router');
const app = new Koa()
const cors = require("koa2-cors") //引入跨域
const {APP_PORT} = require('./config/config.default') //引入全局变量
const {koaBody} = require('koa-body')
const path = require('path')
const koaStatic=require('koa-static')


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

app.use(koaBody(
  {
  multipart:true,
  // formidable: {
	// 	//上传文件存储目录
	// 	uploadDir:path.join(__dirname, `/public/uploads/`),
	// 	//允许保留后缀名
	// 	keepExtensions: true,
	// 	multipart: true,
	// }
}
)).use(router.routes(),router.allowedMethods())


app.listen(APP_PORT,()=>{
    console.log(`http://localhost:${APP_PORT}`);
})