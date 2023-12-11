const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const Collection = seq.define('collection', {
    collection_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    strategy_collection_id: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    collection_detail: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'collection'
});

Collection.sync({ alter: true });

module.exports = Collection;
