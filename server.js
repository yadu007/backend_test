let mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require('./lib/logger');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

(async () => {
  try {
    await mongoose.connect(process.env.QB_MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    logger.info('Connected To MongoDB');

  } catch (err) {
    logger.error('Mongo Connection Error', err);

  }
})()

const routers = require('./routers')
app.use('/', routers)

const port = process.env.QB_PORT || 5000;
app.listen(port, () => {
  logger.info(`Qubryx Server Running On Port ${port} `)
});
