const Redis = require('ioredis').default
//we are using redis cloud
//we are using require so deafult lagan pdaa if we use import to need nhi this iski

const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD

})

 redis.on('connect',()=>{
    console.log("server is connected to redis")
 })
 redis.on("error",(err)=>{
    console.log(err)
 })

 module.exports = redis