const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({ 
    storage: storage,
    limits:{
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
 })

 module.exports = upload

 //ek audio file ke andr song banner songaudio and song lyrics hote and unko server direct
 //nhi pad skta so we have to install package npm i node-id3 to read the audio file and get the data from it and then we will store the data in our database and then we will send the data to our frontend and then we will display the data in our frontend
 // isse song ki file main jitni bhi details hai sab padpaoge
 