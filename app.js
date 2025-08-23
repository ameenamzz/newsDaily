const express = require("express");
const app = express();
const connectDB = require("./config/database");

app.get("/", (req, res) => {
  res.send("hello newsDaily.....");
});

connectDB()
  .then(() => {
    console.log("Cluster Connection Established Succesfully");
    app.listen(3000, () => {
      console.log("listening to port 3000....");
    });
  })
  .catch((err) => {
    console.log("something went wrong!" + err);
  });
