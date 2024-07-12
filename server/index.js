require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const Routes = require('./routes/Routes')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN_VALUE, // Allow only requests from this origin
  methods: 'GET,POST', // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(cors(corsOptions))

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.disable('x-powered-by');

app.use(express.json());


app.use((req, res, next) => {
  console.log(req.path, req.method);
  // res.header("Access-Control-Allow-Origin", process.env.ORIGIN_VALUE);
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// userRoutes
app.use("/api", Routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "Connected to db and Server is running on port",
        PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
