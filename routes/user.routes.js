const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).send({
        msg: "User already registered, Please Try with another email.",
      });
    }
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).send({
          msg: "Internal server Error",
        });
      } else {
        const newUser = new UserModel({
          username,
          email,
          password: hash,
        });
        await newUser.save();
        res.status(200).send({
          msg: "User registered Successfully.",
        });
      }
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

// user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const access_token = jwt.sign(
          {
            userID: user._id,
            author: user.username,
          },
          "nishant"
        );
        res
          .status(200)
          .send({ msg: "User Logged in Successfully.", access_token });
      } else {
        res.status(400).send({ msg: "Wrong Credentials" });
      }
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = { userRouter };
