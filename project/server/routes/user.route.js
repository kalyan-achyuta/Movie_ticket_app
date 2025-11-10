const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();
const jwt =  require('jsonwebtoken');
const isAuth = require("../middlewares/authMiddleware");

userRouter.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashPwd = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashPwd;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        success: false,
        message: "User Not Found Please Register",
      });
    }
    const validatPassword = await bcrypt.compareSync(req.body.password, user.password);
    if(!validatPassword){
        res.send({
            success: false,
            message: "Invalid Password",
        });
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.cookie('jwt_token', token, { httpOnly: true });

    res.send({
        success: true,
        message: "User Logged In Successfully",
        user: user
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

userRouter.get('/current-user', isAuth, async(req, res) => {
    const userId = req.userId;
  if (userId === undefined) {
    return res.status(401).json({ message: "Not authorized , no token" });
  }
  try {
    const verifiedUser = await User.findById(userId).select("-password");
    res.json(verifiedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  } 
})  


module.exports = userRouter;
