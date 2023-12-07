const Koa = require('koa');
const router = require('./router');
const cors = require("koa2-cors") //引入跨域
const {APP_PORT} = require('./config/config.default') //引入全局变量
const {koaBody} = require('koa-body') //获取请求参数
const http = require('http')
const {Server} = require('socket.io');
const db = require('./db/dbConn.js')
const chatSocket = require('./socket/chat')
const chatModel = require('./db/model/chat.model.js');
const circleMsgModel = require('./db/model/circleMsg.model.js')
// const { getCircleMsg } = require('./service/circle.service.js');
const app = new Koa()
const server = http.createServer(app.callback())
//构建Socket.IO服务器
const io = new Server(server,{
  cors: {
    origin:"http://localhost:8080",
    credentials: true
  }
})
app.context.db = db
app.context.io = io

app.use(koaBody(
  {
  multipart:true
}
)).use(router.routes(),router.allowedMethods())

/**
 * The socket parameter represents a WebSocket connection.
 * @typedef {import('socket.io').Socket} Socket
 */
//监听WebSocket连接
io.on('connection',(socket) => {
  socket.on('join',(roomid) => {
    socket.join(roomid)
    console.log('join',roomid);
  }),
  chatSocket(socket,io,db,chatModel,circleMsgModel)
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