const path = require("path");

const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, ".env")
});
let mongoose = require('mongoose')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
let User = require('./models/users');
let jsonwebtoken = require("jsonwebtoken");

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ensurity', {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    console.log("connected");

  } catch (err) {
    console.log("mongo error");

  }
})();

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"))

const routers = require('./routers')
app.use('/', routers)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Qubryx Running at port ${port} `
  );
});