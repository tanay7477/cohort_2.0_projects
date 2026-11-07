const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false
  }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel

// userschema.pre('save',function(next){})
// userschema.post('save',function(next){})
