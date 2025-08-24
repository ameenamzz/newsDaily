var validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, email, password, profilePhoto, preferences } =
    req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  } 
};

module.exports = { validateSignUp };
