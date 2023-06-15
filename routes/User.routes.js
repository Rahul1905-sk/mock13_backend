const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  const {  password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(400).send({ err: err.message });
      }
      if (hash) {
        let user1 = new UserModel({ ...req.body, password: hash });
        await user1.save();
        res.status(200).send({ msg: "Register Successfully" });
      }
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      bcrypt.compare(password, oldUser.password, async (err, result) => {
        if (err) {
          res.status(400).send({ err: err.message });
        }

        if (result) {
          jwt.sign(
            { userID: oldUser._id, username: oldUser.username },
            "rahul",
            async (err, token) => {
              if(err) {
                res.status(400).send({ err: err.message });
              } 
              if(token) {

                res.status(200).send({ msg: "Login Successfull", token });
              }
            }
          );
        } else {
          res.status(200).send({ msg: "Login Failed" });
        }
      });
    } else {
      res.status(200).send({ msg: "Please Signup First" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  userRoutes,
};
