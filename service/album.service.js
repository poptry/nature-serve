
const sequelize = require('../db/dbConn.js');

class AlbumService{
    async getAlbums(circle_id,user_id){
        const sql = ` SELECT * 
        FROM album a
        LEFT JOIN user u on a.user_id=u.user_id
        WHERE a.circle_id = :circle_id
        ORDER BY a.album_timestamp DESC`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.SELECT,
                replacements:{
                    circle_id:circle_id
                }
            })
            return res;
        }catch(error){
            console.log(error);
        }
    }
    //上传相册
    async uploadAlbum(user_id,circle_id,album_describe,album_url,album_timestamp){
        const sql = `INSERT INTO album(user_id,circle_id,album_url,album_describe,album_timestamp) 
        VALUES (:user_id,:circle_id,:album_url,'${album_describe}','${album_timestamp}')`;
        try{
            const res = await sequelize.query(sql,{
                type:sequelize.QueryTypes.INSERT,
                replacements:{
                    user_id:user_id,
                    circle_id:circle_id,
                    album_url:JSON.stringify(album_url),
                }
            })
            return {
                code:200,
                msg:'上传成功'
            };
        }catch(error){
            return {
                code:400,
                msg:'上传失败'
            };
        }
    }
}
module.exports = new AlbumService()
