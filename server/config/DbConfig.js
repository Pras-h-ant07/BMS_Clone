const mongoose = require("mongoose");

mongoose
  .connect(process.env.DbURL)
  .then(() => {
    console.log("Database connected successfully !!");
  })
  .catch((err) => {
    console.log(err);
  });
