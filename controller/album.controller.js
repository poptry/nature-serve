const {getAlbums,uploadAlbum} = require('../service/album.service')
const client = require('../util/oss_init.js')
class albumController{
    async getAlbums(ctx,next){
        const {circle_id,user_id} = ctx.request.query
        ctx.body =  JSON.stringify(await getAlbums(circle_id,user_id))
    }
    async uploadAlbum(ctx,next){
        const files = ctx.request.files;
        // console.log(files);
        let {albumInfo} = ctx.request.body
        albumInfo = JSON.parse(albumInfo)
        const {user_id,circle_id,album_describe,album_url} = albumInfo
        // 获取时间戳
        const timeStamp = Math.round(new Date().getTime()/1000)
        for (const key of Object.keys(files)) {
            const file = files[key];
            if(Array.isArray(file)){
                for (let key in file) {
                    if (file.hasOwnProperty(key)) {
                        const item = file[key];
                        // 获取随机数
                        const uniqueNumber = Math.floor(Math.random() * 1000000);
                        let name = `/album/${timeStamp}${uniqueNumber}a${user_id}.JPG`;
                
                        // 假设 item 是一个包含 filepath 属性的对象
                        const result = await client.put(name, item.filepath, {
                            headers: {
                                'x-oss-storage-class': 'Standard',
                                'x-oss-object-acl': 'private',
                                'Content-Disposition': 'inline',
                                'content-type': 'image/jpg'
                            }
                        });
                
                        album_url.push(result.url);
                    }
                }         
            }else{
                // 获取随机数
                const uniqueNumber = Math.floor(Math.random() * 1000000);
                let name = `/album/${timeStamp}${uniqueNumber}a${user_id}.JPG`;
                // 假设 item 是一个包含 filepath 属性的对象
                const result = await client.put(name, file.filepath, {
                    headers: {
                        'x-oss-storage-class': 'Standard',
                        'x-oss-object-acl': 'private',
                        'Content-Disposition': 'inline',
                        'content-type': 'image/jpg'
                    }
                });
                album_url.push(result.url);
            }
    
            // if (file.hasOwnProperty(key)) {
            //     for(let item of file){
            //         console.log(item);
            //         //获取随机数
            //         const uniqueNumber = Math.floor(Math.random() * 1000000);
            //         let name = `/album/${timeStamp}${uniqueNumber}a${user_id}.JPG`
            //         const result =  await client.put(name,`${item.filepath}`,{
            //             headers:{
            //                 'x-oss-storage-class': 'Standard',
            //                 'x-oss-object-acl': 'private',
            //                 'Content-Disposition': 'inline',
            //                 'content-type': 'image/jpg'
            //             }})
            //         album_url.push(result.url)
            //     }
            // }else{
            //     //获取随机数
            //     const uniqueNumber = Math.floor(Math.random() * 1000000);
            //     let name = `/album/${timeStamp}${uniqueNumber}a${user_id}.JPG`
            //     const result =  await client.put(name,`${file.filepath}`,{
            //         headers:{
            //             'x-oss-storage-class': 'Standard',
            //             'x-oss-object-acl': 'private',
            //             'Content-Disposition': 'inline',
            //             'content-type': 'image/jpg'
            //         }})
            //     album_url.push(result.url)
            // }
        }
        ctx.body = JSON.stringify(await uploadAlbum(user_id,circle_id,album_describe,album_url,timeStamp))
    }
}
module.exports = new albumController()
