module.exports = (socket, io, db,chatModel) => {
    console.log('User connected:', socket.id);
    // Handle chat message event
    socket.on('chatMsg', async (data) => {
    const { send_id, receive_id, msg, timestamp } = data;
    console.log(send_id,receive_id,msg,timestamp);
    if(send_id && receive_id && msg && timestamp){
        await chatModel.create({
            chat_send_id:send_id,
            chat_receive_id:receive_id,
            chat_msg:msg,
            chat_timestamp:timestamp
        })
    }
      // Broadcast the message to all connected users
      io.emit('chatMsg', data);
    });
  
    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  };
  