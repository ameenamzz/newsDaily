const express = require("express");
const app = express();
const connectDB = require("./config/database");
var cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(profileRouter);
app.get("/", (req, res) => {
  res.send("hello newsDaily.....");
});

connectDB()
  .then(() => {
    console.log("DB Connection Established Succesfully");
    app.listen(5000, () => {
      console.log("listening to port 5000....");
    });
  })
  .catch((err) => {
    console.log("something went wrong!" + err);
  });
