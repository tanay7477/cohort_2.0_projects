import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import { authUser } from "../middlewares/auth.middleware.js";

export async function register(req,res){
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ 
        $or: [{ email }, { username }]
    });

    if (isUserAlreadyExist) {
        return res.status(400).json({ 
            message: "User already exists with this email" ,
            success: false,
            err:"User already exists with this email"
        });
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    const emailVerificationToken = jwt.sign({
        email:user.email,
    },process.env.JWT_SECRET,)

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity!",
        // text:`Hello ${username},\n\nThank you for registering with Perplexity! We're excited to have you on board.\n\nBest regards,\nThe Perplexity Team`,
        html:`<p>Hello ${username},</p>
        <p>Thank you for registering with Perplexity! We're excited to have you on board.</p>
        
        <p>Please verify the email address by clicking link below</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verifi Email</a>
        
        <p>Best regards,<br>The Perplexity Team</p>`
    })
    //text bhej rhe to html bhejna ki need nahi hai


    res.status(201).json({ message: "User registered successfully",
        success:true,       
         user :{
            id: user._id,
            username: user.username,
            email: user.email
         }
        });
}

export async function verifyEmail(req, res) {
    try {
        const { token } = req.query

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({ email: decoded.email })

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "user not found"
            })
        }

        user.verified = true

        await user.save()

        const html = `
            <h1>Email Verified Successfully</h1>
            <p>Your email has been verified. You can now log in to your account.</p>
            <a href='http://localhost:3000/login'>Go to login</a>
        `

        res.send(html)

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            err: error.message
        })
    }
}

export async function login(req,res){
    const {username , email , password} = req.body

    const user = await userModel.findOne({
        $or:[{email},{username}]
    })
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    const isPassMatch = await user.comparePassword(password)
    if(!isPassMatch){
        return res.status(400).json({
            message:"Invalid email or password",
            success:false,
            err:"Incorrect password"
        })
    }
    if(!user.verified){
        return res.status(400).json({
            message:"please verify your email before logging in",
            success:false,
            err:"email not verified"
        })
    }
      const token = jwt.sign({
        id:user._id,
        username:user.username,
        email:user.email,
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token)

     res.status(200).json({
        message:"login successful",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
     })
}

export async function getMe(req,res){
    const userId = req.user.id; //auth middleware se nikali

    const user = await userModel.findById(userId).select("-password")

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"user not found"
        })
    }

    res.status(200).json({
        message:"user deatils fetched successfully!",
        success:true,
        user})



}


