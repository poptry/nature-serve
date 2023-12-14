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
        // const sql = `SELECT P.product_id,P.product_img,P.product_name,P.product_disc_price,P.product_orig_price,P.product_stock
        // FROM shopcart S LEFT JOIN product P ON P.product_id = S.product_id
        // WHERE S.user_id = :user_id;`;
        const sql = `SELECT P.*,S.shopCart_pronum,S.size_name
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
    //更改用户购物车某一商品的数量
    async updateShopCart(data){
        const sql = `UPDATE shopcart SET shopCart_pronum = :shopCart_pronum
        WHERE user_id = :user_id AND product_id = :product_id;`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.UPDATE,
                replacements: { user_id: data.user_id,product_id: data.product_id,shopCart_pronum:data.shopCart_pronum }
            })
            return {
                res:res,
                code:200,
                msg:'修改成功'
            }
        }catch(error){
            return {
                code:500,
                msg:'修改失败'
            }
        }
    }
    //添加商品到购物车
    async addShopCart(params){
        const sql = `INSERT INTO shopcart (user_id,product_id) VALUES (:user_id,:product_id);`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.INSERT,
                replacements: { user_id: params.user_id,product_id: params.product_id }
            })
            return {
                res:res,
                code:200,
                msg:'添加成功'
            }
        }catch(error){
            return {
                code:500,
                msg:'添加失败'
            }
        }
    }
    //删除购物车商品
    async deleteShopCart(params){
        const sql = 'DELETE FROM shopcart WHERE user_id = :user_id AND product_id = :product_id;';
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.DELETE,
                replacements: { user_id: params.user_id,product_id: params.product_id }
            })
            return {
                res:res,
                code:200,
                msg:'删除成功'
            };
        }catch(error){
            return {
                code:500,
                msg:'删除失败'
            }
        }
    }
    //查询该商品是否被用户加入购物车
    async findShopCart(params){
        const sql = `SELECT * FROM shopcart S
        WHERE S.user_id = :user_id AND S.product_id = :product_id;`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { user_id: params.user_id,product_id: params.product_id }
            })
            return {
                res:res,
                code:200,
                msg:'查询成功'
            }
        }catch(error){
            return{
                error:error,
                code:500,
                msg:'查询失败'
            }
        }
    }
    //用户购买成功后
    async paySuccess(params){
        const sql = `UPDATE product SET product_stock = product_stock - :shopCart_pronum
        WHERE product_id = :product_id;`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.UPDATE,
                replacements: { product_id: params.product_id,shopCart_pronum:params.shopCart_pronum }
            })
            return {
                res:res,
                code:200,
                msg:'修改成功'
            }
        }catch(error){
            return {
                code:500,
                msg:'修改失败'
            }
        }
    }
    //订单查询并返回商品相关信息
    async getOrders(params){
        const sql = `SELECT P.*,O.*FROM orders O LEFT JOIN product P on O.product_id = P.product_id
        WHERE O.user_id = :user_id;`
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { user_id: params.user_id }
            })
            return {
                data:res,
                code:200,
                msg:'查询成功'
            }
        }catch(error){
            return{
                error:error,
                code:500,
                msg:'查询失败'
            }
        }
    }
}
module.exports = new ProService()