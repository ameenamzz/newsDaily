const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePhoto, preferences } =
      req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      profilePhoto,
      preferences,
    });

    await user.save();
    res.send("user added successfully");
  } catch (error) {
    res.status(400).send("ERROR" + error.message);
  }
});

module.exports = authRouter;
