const winston = require('winston');
const path = require("path");

const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    winston.format.printf(error => `${error.timestamp} ${error.level}: ${error.message}`),
  );
  
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: myformat
      }),
      new winston.transports.File({
        filename: path.join(__dirname, 'log.txt'),
        maxsize: 500
      })
    ]
  });

  module.exports = logger