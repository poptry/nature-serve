const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const Circle = seq.define('circle', {
    circle_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    circle_avatar: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    circle_profile: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    circle_owner: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    circle_avatar: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    circle_city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    circle_type: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    circle_people: {
        type: DataTypes.INTEGER(20),
        allowNull: false,
        defaultValue:0
    },
    circle_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    circle_preview: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'circle'
});

Circle.sync({ alter: true });

module.exports = Circle;
