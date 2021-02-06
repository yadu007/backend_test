
module.exports = {
    async connect() {
      const mongoose = require("mongoose").set(
        "debug",
        process.env.NODE_ENV != "production"
      );

      //TODO: change this to simply read from config file
      mongoose.connect(process.env.MONGO_CONNECTION_URI, {
        useCreateIndex: true,
        useNewUrlParser: true
      });
    }
  };