const { DataTypes } = require('sequelize');
const seq = require('../dbConn.js');

const Product = seq.define('product', {
    product_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_orig_price: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_disc_price: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    product_img:{
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    product_prev_img:{
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    product_describe:{
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    product_type:{
        type: DataTypes.INTEGER(10),
        allowNull: false    
    },
    product_classification:{
        type: DataTypes.STRING(20),
        allowNull: false    
    },
    product_comnum:{
        type: DataTypes.INTEGER(20),
        allowNull: false    
    },
    product_score:{
        type: DataTypes.DECIMAL(2,1),
        allowNull: false    
    },
    // 其他字段可以继续添加
}, {
    timestamps: false,
    tableName: 'Product'
});

Product.sync({ alter: true });

module.exports = Product;
