//数据库实体
const {DataTypes} = require('sequelize')
const seq = require('../dbConn.js')
const User = seq.define(
    'user',{
    user_id:{
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    user_pwd:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    user_name:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    user_sex:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    user_age:{
        type:DataTypes.INTEGER(10),
        allowNull:false
    },
    user_motto:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_city:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    user_avatar:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_hobby:{
        type:DataTypes.STRING(60),
        allowNull:true
    },
    user_wantto_do:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    user_wantto_go:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    user_speciality:{
        type:DataTypes.STRING(60),
        allowNull:true
    },
    user_doing:{
        type:DataTypes.STRING(255),
        allowNull:true
    }
},{
    timestamps:false,
    tableName: 'user'
});
User.sync({alter:true})

module.exports = User