const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const server = require("http").createServer(app);

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// setting templetes for ejs
app.set("view engine", "ejs");

// morgan middleware
app.use(morgan("tiny"));

// import all the routed

const donation = require("./routes/donationRoute");
const userRoute = require("./routes/userRoute");
const receiver = require("./routes/receiverRoute");

// router middleware
app.use("/api/v1", donation);
app.use("/api/v1",userRoute);
app.use("/api/v1",receiver);
module.exports = app;
