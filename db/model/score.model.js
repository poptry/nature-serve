//数据库实体
const {DataTypes} = require('sequelize')
const seq = require('../dbConn.js')
const Score = seq.define(
    'score_pro',{
    //如果我先在数据库中定义了主键字段，然后才是在这边定义的主键字段，那么这边的主键字段 不会 覆盖数据库中的主键字段
    score_id:{
        type: DataTypes.BIGINT(30),
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
    score_number:{
        type: DataTypes.INTEGER(20),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'score_pro'
});
Score.sync({alter:true})

module.exports = Score