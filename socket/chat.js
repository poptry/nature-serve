module.exports = (socket, io, db,chatModel,circleMsgModel) => {
    // Handle chat message event 私聊
    socket.on('chatMsg', async (data) => {
      const { send_id, receive_id, msg, timestamp } = data;
      if(send_id && receive_id && msg && timestamp){
        //好友聊天
        await chatModel.create({
            chat_send_id:send_id,
            chat_receive_id:receive_id,
            chat_msg:msg,
            chat_timestamp:timestamp
        })
      }else{
        data ={
          code:400,
          msg:'有一项没有'
        }
      }
      if(send_id){
        io.to(send_id).emit('chatMsg', data); 
        if(receive_id){
          io.to(receive_id).emit('chatMsg', data);
        }
      }
    });
    //群聊
    socket.on('chatCircleMsg',async (data) => {
      const { send_id, msg, timestamp,circle_id } = data;
      if(circle_id){
        await circleMsgModel.create({
          user_id:send_id,
          circle_id:circle_id,
          chatMsg_timestamp:timestamp,
          circleMsg_content:msg
        })
        io.to(circle_id).emit('chatCircleMsg', data);
      }
    });
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  };
  