const productModel = require('../db/model/product.model.js')
const sequelize = require('../db/dbConn.js');

class ProService{
    //操作数据库获取商品信息
    async getPros(params){
        console.log('params',params);
        if(!params.proName){
            const res = await productModel.findAll()
            return res;
        }else{
            const sql = `SELECT * FROM product p
            WHERE p.product_name LIKE :proName`;
            try{
                const res = await sequelize.query(sql,{
                    type:sequelize.QueryTypes.SELECT,
                    replacements: { proName: `%${params.proName}%` }
                })
                return res;
            }catch(error){
                console.log(error);
            }
        }
    }
    async getMenPros(params){
        if(!params.proName){
            const sql = `SELECT * FROM product p
            WHERE p.product_type = 1;`;
            try{
                const res = await sequelize.query(sql,{
                    type:sequelize.QueryTypes.SELECT,
                })
                return res;
            }catch(error){
                console.log(error);
            }
        }else{
            const sql = `SELECT * FROM product p
            WHERE p.product_type = 1 and p.product_name LIKE :proName`;
            try{
                const res = await sequelize.query(sql,{
                    type:sequelize.QueryTypes.SELECT,
                    replacements: { proName: `%${params.proName}%` }
                })
                return res;
            }catch(error){
                console.log(error);
            }
        }
    }
    async getWomenPros(params){
        if(!params.proName){
            const sql = `SELECT * FROM product p
            WHERE p.product_type = 0;`;
            try{
                const res = await sequelize.query(sql,{
                    type:sequelize.QueryTypes.SELECT,
                })
                return res;
            }catch(error){
                console.log(error);
            }
        }else{
            const sql = `SELECT * FROM product p
            WHERE p.product_type = 0 and p.product_name LIKE :proName`;
            try{
                const res = await sequelize.query(sql,{
                    type:sequelize.QueryTypes.SELECT,
                    replacements: { proName: `%${params.proName}%` }
                })
                return res;
            }catch(error){
                console.log(error);
            }
        }
    }
}
module.exports = new ProService()