const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,'Username is required'],
    unique:[true , 'username must be unique']
  },
  email:{
    type:String,
    required:[true,'email is required'],
  },
  password:{
    type:String,
    required:[true,'password is required'],

  }
})


userschema.pre('save',function(next){})
userschema.post('save',function(next){})

module.exports = userSchema