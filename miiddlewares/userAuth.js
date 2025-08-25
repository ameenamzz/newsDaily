var jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
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
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
};

module.exports = { userAuth };
