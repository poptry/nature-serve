let OSS = require('ali-oss');
const path = require("path")
const { OSS_ACCESS_KEY_ID,OSS_ACCESS_KEY_SECRET } = require('../config/config.default')
let client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-hangzhou',
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: OSS_ACCESS_KEY_ID,
  accessKeySecret: OSS_ACCESS_KEY_SECRET,
  bucket: 'natural-image'
});
// 自定义请求头
const headers = {
  // 指定Object的存储类型。
  'x-oss-storage-class': 'Standard',
  // 指定Object的访问权限。
  'x-oss-object-acl': 'private',
  'Content-Disposition': 'inline',
  //指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
  // 'x-oss-forbid-overwrite': 'true',
};
module.exports = client