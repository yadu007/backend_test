var mongoose = require("mongoose");
var COLLECTION_NAME = "equipments";
const {
  ObjectId
} = require('mongodb');


var equimentSchema = mongoose.Schema({
  project_id: mongoose.Schema.Types.ObjectId,
  name: String,
  type: mongoose.Schema.Types.ObjectId, // object id and use ref
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default : ""
  },
  property1: String,
});

module.exports = mongoose.model(COLLECTION_NAME, equimentSchema);