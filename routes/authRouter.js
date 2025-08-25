const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { validateSignUp } = require("../utils/validator");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, email, password, profilePhoto, preferences } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profilePhoto,
      preferences,
    });
    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      throw new Error("User Not found");
    }
    // PASSWORD CHECK
    const passwordHash = user.password;
    const passwordCheck = await bcrypt.compare(password, passwordHash);
    if (!passwordCheck) {
      throw new Error("Incorrect Password");
    }

    // JWT TOKEN
    var token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.send("login Successfull");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = authRouter;
