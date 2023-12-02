//数据库实体
const {DataTypes} = require('sequelize')
const seq = require('../dbConn.js')
const Score = seq.define(
    'score_pro',{
    score_id:{
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    product_id:{
        type:DataTypes.BIGINT(20),
        allowNull:false
    },
    user_id:{
        type:DataTypes.BIGINT(20),
        allowNull:false
    },
    score_sum:{
        type: DataTypes.DECIMAL(2,1),
        allowNull: false
    },
    score_user:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    }
},{
    timestamps:false,
    tableName: 'score_pro'
});
Score.sync({alter:true})

module.exports = Score