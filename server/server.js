require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN_VALUE }));
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  // res.header("Access-Control-Allow-Origin", "https://authentication-sys.vercel.app/");
  // res.header("Access-Control-Allow-Credentials", "true");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  // );
  next();
});
app.disable("x-powered-by");

// userRoutes
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and Server is running on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
