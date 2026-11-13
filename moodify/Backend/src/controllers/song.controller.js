const express = require('express')
const songModel = require('../model/song.model')
const id3 = require('node-id3')
const storageService = require('../services/storage.service')

//server files ko pad nhi pata so we use multer for file upload and 
// then we will store the file in our server and then we will store the path of the file in our database

//OPTIMISATION -> yeh upload waler part ko promise.all main rkhne se aur fast uplaod hoga dono ek sath upload honge implement it , abhi ek ek krke upload ho rhe hai
//promise.all ek array lega aur usme jitne bhi promises honge unko ek sath execute karega aur jab sab complete ho jaye to result dega

async function uploadSong(req,res){
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)

    //* if you use promise.all then more fast upload honge dono ek sath upload honge 
    const songFile =  await storageService.uploadFile({
        buffer: songBuffer,
        filename: tags.title+".mp3",
        folder: "/cohort_2.0_projects/moodify/songs"
    });

    const posterFile = await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "/cohort_2.0_projects/moodify/posters"
    });

const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood
})
    res.status(201).json({
        message: "Song uploaded successfully",
        song
    })

}

async function getSong( req,res){
    const {mood} = req.query
    const song = songModel.findOne({
        mood
    })
    //happy ke multiple song ahai to koi bhi aaskta happy mood pe so hum sample use krte hai jisse same song nhi aae br baar
    

    res.status(200).json({
        message:"song fetched successfully!",
        song
    })
}

module.exports = {
    uploadSong,
    getSong
}