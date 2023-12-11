const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const Chat = seq.define('chat', {
    chat_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    chat_send_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    chat_receive_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    chat_msg: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    chat_timestamp:{
        type: DataTypes.STRING(255),
        allowNull: true    
    }
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'Chat'
});

Chat.sync({ alter: true });

module.exports = Chat;
