const express = require("express");
const User = require("../models/user");
const profileRouter = express.Router();
var jwt = require("jsonwebtoken");

profileRouter.get("/profile/view", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    const decode = jwt.verify(token, "NEWS@123");
    const email = decode.email;
    const user = await User.findOne({
      email: email,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
