const Koa = require('koa');
const router = require('./router');
const app = new Koa()
const cors = require("koa2-cors") //引入跨域
const {APP_PORT} = require('./config/config.default') //引入全局变量
const {koaBody} = require('koa-body') //获取请求参数
const http = require('http')
const {Server} = require('socket.io');
app.use(koaBody(
  {
  multipart:true
}
)).use(router.routes(),router.allowedMethods())
const server = http.createServer(app.callback())
//构建Socket.IO服务器
const io = new Server(server,{
  cors: {
    origin:"http://localhost:8080",
    credentials: true
  }
})
//监听WebSocket连接
io.on('connection',(socket) => {
  console.log('用户连接成功');
  socket.on('msg',msg=>{
    console.log(msg);
    io.emit('msg',msg)
  })
})
//https://segmentfault.com/q/1010000040670135 跨域
app.use(cors({
  origin: function(ctx) {
    return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  // allowMethods: ['GET', 'POST', 'DELETE','PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
server.listen(APP_PORT,()=>{
    console.log(`http://localhost:${APP_PORT}`);
})