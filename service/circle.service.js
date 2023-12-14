const circleModel = require('../db/model/circle.model.js')
const sequelize = require('../db/dbConn.js');

class circleService{
    //获取所有的圈子,除了自己加入过了的圈子
    async getCircle(){
        const sql=`
        SELECT c.*
        FROM circle c`;
        // const sql = `SELECT C.*
        // FROM circle C
        // left JOIN (
        //     SELECT * FROM
        //     user_circle UC
        //     WHERE UC.user_id = 1
        // )AS UC ON C.circle_id = UC.circle_id
        // WHERE UC.user_id IS NULL`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //获取当前用户加入的圈子
    async getMyCircle(user_id){
        const sql = `
        SELECT * 
        FROM circle c
        LEFT JOIN user_circle uc on c.circle_id = uc.circle_id
        WHERE uc.user_id =:user_id
        `;
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
    //模糊查询圈子
    async getCircleByName(circleName){
        const sql = `SELECT * FROM circle c
        WHERE c.circle_name LIKE :circleName`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { circleName: `%${circleName}%` }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //查询圈子成员
    async getCircleMembers(circle_id){
        const sql = `select U.user_id,U.user_name,U.user_avatar,U.user_hobby,U.user_motto,U.user_age,U.user_sex,U.user_city
        FROM circle_user C
        LEFT JOIN user U on U.user_id = C.user_id
        WHERE C.circle_id = :circle_id`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { circle_id: circle_id }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //查询圈主信息
    async getCircleOwner(circle_id){
        const sql = `select U.user_id,U.user_name,U.user_avatar,U.user_hobby,U.user_motto,U.user_age,U.user_sex,U.user_city
        FROM user U LEFT JOIN circle C on U.user_id=C.circle_owner
        WHERE C.circle_id=:circle_id`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { circle_id: circle_id }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //获取圈子的聊天记录
    async getCircleMsg(circle_id){
        const sql = `select C.*,U.user_avatar from circle_msg C left join user U on C.user_id = U.user_id  where circle_id=:circle_id`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements: { circle_id: circle_id }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //加入某个圈子
    async joinCircle(user_id,circle_id){
        const sql = `insert into user_circle(user_id,circle_id) values(:user_id,:circle_id)`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.INSERT,
                replacements: { user_id: user_id,circle_id:circle_id }
            })
            return {
                code:200,
                msg:'加入成功'
            }
        }catch(error){
            return {
                code:400,
                msg:'您已加入过啦!'
            }
        }
    }
    //新建我的圈子
    async createMyCircle(data){
        //利用cirModel的create方法
        try{
            const res = await circleModel.create({
                circle_name:data.circle_name,
                circle_owner:data.circle_owner,
                circle_profile:data.circle_profile,
                circle_city:data.circle_city,
                circle_type:data.circle_type,
                circle_avatar:data.circle_avatar,
                circle_preview:data.circle_preview
            })
            return {
                code:200,
                msg:'创建成功',
                res
            }
        }catch(error){
            return {
                code:400,
                msg:'创建失败',
                error:error
            }
        }
    }
    //用户退出圈子
    async quitCircle(user_id,circle_id){
        const sql = `delete from user_circle where user_id=:user_id and circle_id=:circle_id`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.DELETE,
                replacements: { user_id: user_id,circle_id:circle_id }
            })
            return {
                code:200,
                msg:'退出成功'
            }
        }catch(error){
            return {
                code:400,
                msg:'退出失败'
            }
        }
    }
}
module.exports = new circleService()