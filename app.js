const express = require("express");
const app = express();
const connectDB = require("./config/database");
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("hello newsDaily.....");
});

connectDB()
  .then(() => {
    console.log("Cluster Connection Established Succesfully");
    app.listen(5000, () => {
      console.log("listening to port 5000....");
    });
  })
  .catch((err) => {
    console.log("something went wrong!" + err);
  });
