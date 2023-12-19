const Redis = require('ioredis')
const redis = {
    port:6379,
    host:'116.62.37.2',
    ttl:1,
    password:'12345qwert'
}
const newRedis = new Redis(redis)
module.exports = newRedis