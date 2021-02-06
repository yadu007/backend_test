var mongoose = require("mongoose");
var COLLECTION_NAME = "equipment_types";

var equimentTypeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model(COLLECTION_NAME, equimentTypeSchema);