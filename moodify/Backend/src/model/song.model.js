const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    url:{
        type: String,
        required: [true, "Song URL is required"]
    },
    title: {
        type: String,
        required: [true, "Song title is required"]
    },
    
    posterUrl: {
        type: String,
        required: [true, "Song poster URL is required"]
    },
    mood:{
        type: String,
        enum:{
            values: ['happy', 'sad', 'surprised'],
            message :"ENUM this is invalid"
        }
    }
    
}, {
    timestamps: true
})

const songModel = mongoose.model('songs', songSchema)

module.exports = songModel