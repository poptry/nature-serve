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
    //获取男装商品
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
    //获取女装商品
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
    //获取用户购物车信息
    async getShopCart(user_id){
        const sql = `SELECT P.product_id,P.product_img,P.product_name,P.product_disc_price,P.product_orig_price,P.product_stock
        FROM shopcart S LEFT JOIN product P ON P.product_id = S.product_id
        WHERE S.user_id = :user_id;`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { user_id: user_id }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new ProService()