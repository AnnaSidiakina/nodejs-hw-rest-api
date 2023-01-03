const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB is working");
    app.listen(PORT);
  })
  .then(() => {
    console.log("Server running. Use our API on port: 3000");
  })
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });
