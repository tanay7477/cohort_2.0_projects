//now ,for token blacklisting we are using mongodb but later we would use redis

const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true , "token is required for blacklisting"],
    }
},{
    timestamps:true
})

const blacklistModel = mongoose.model('blacklist' , blacklistSchema)

module.exports = blacklistModel

//ab hum isse use nhi kr rhe hai we implement redis for token blacklisting so we can remove this file in future