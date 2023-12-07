const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const CircleChat = seq.define('circle', {
    circleMsg_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    circle_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    chatMsg_timestamp: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    circleMsg_content:{
        type: DataTypes.STRING(255),
        allowNull: true    
    },
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'circle_msg'
});

CircleChat.sync({ alter: true });

module.exports = CircleChat;
