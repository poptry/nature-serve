const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const StrategyCollection = seq.define('strategy_collection', {
    strategy_collection_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    city: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    strategy_collection_content: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    strategy_collection_background:{
        type: DataTypes.STRING(255),
        allowNull: true
    }
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'strategy_collection'
});

StrategyCollection.sync({ alter: true });

module.exports = StrategyCollection;
