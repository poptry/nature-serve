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
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_name:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_sex:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_age:{
        type:DataTypes.INTEGER(11),
        allowNull:false
    },
    user_motto:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_city:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    user_avatar:{
        type:DataTypes.STRING(255),
        allowNull:false
    }
},{
    timestamps:false,
    tableName: 'user'
});
User.sync({alter:true})

module.exports = User