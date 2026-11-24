import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";

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

    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity!",
        // text:`Hello ${username},\n\nThank you for registering with Perplexity! We're excited to have you on board.\n\nBest regards,\nThe Perplexity Team`,
        html:`<p>Hello ${username},</p>
        <p>Thank you for registering with Perplexity! We're excited to have you on board.</p>
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