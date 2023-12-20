const mysql = require('mysql2')
const {Sequelize} = require('sequelize')
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQP_DB } = require('../config/config.default')
const seq = new Sequelize(MYSQP_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql', // 数据库类型
    pool: {
        max: 15,
        min: 5,
        idle: 20000,
        evict: 15000,
        acquire: 30000
    },
});

try{
    const res = seq.authenticate();
    console.log("链接成功",res);
}catch(err){
    console.log(err);
}
module.exports = seq