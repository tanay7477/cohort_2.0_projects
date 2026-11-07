const userModel = require('../model/user.model')
const blacklistModel = require('../model/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const redis = require('../config/cache')

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isAlreadyRegistered) {
      const existingField =
        isAlreadyRegistered.email === email
          ? `with this email ${email}`
          : `with this username ${username}`;
      return res.status(409).json({
        message: `User already exists ${existingField}`,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Username or email, and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function getMe(req,res){

  const user = await userModel.findById(req.user.id)
  // response main jo user bhejte isme pass bhi chla jata
  //so .select('-password') use kr skte but hr jagah isse likhnege to code jada ho jaega instead schema main kr do select false
  
  res.status(200).json({
    "messaage":"user fetched successFully",
    user
  })

}

async function logoutUser(req,res){
  const token = req.cookies.token

  res.clearCookie('token')

  await redis.set(token,Date.now().toString(),"EX",60*60*24)

  res.status(201).json({
      message:"logout successfully done!"
    })

}
/**
 * redis stores data in key value pair
 */

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}