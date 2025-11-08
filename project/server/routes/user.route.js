const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const userRouter = express.Router();

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
    res.send({
        success: true,
        message: "User Logged In Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});


module.exports = userRouter;
