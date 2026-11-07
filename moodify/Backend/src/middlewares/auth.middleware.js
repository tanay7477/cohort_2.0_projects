const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../model/blacklist.model')
const redis = require('../config/cache')

async function authUser(req,res,next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            "message":"Token not provided!"
        })
    }
    
    // const isAlreadyBlacklist = await blacklistModel.findOne({token})
    const isAlreadyBlacklist = await redis.get(token)
 
    if(isAlreadyBlacklist){
    return res.status(401).json({
      message:"token already blacklisted!"
    })
  }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(err){
        //agr token glt yah expired milega then 
        return res.status(401).json({
            "message":"Invalid token!"
        })
    }
}
module.exports = {
    authUser
}