var mongoose = require("mongoose");
var COLLECTION_NAME = "equipments";

var equimentTypeSchema = mongoose.Schema({
  name: String,
  type: String, // object id and use ref
  parent:String, // object id and use ref
  property1: String,
  property2: String

});

module.exports = mongoose.model(COLLECTION_NAME, equimentTypeSchema);