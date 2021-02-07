var mongoose = require("mongoose");
var COLLECTION_NAME = "projects";
const {
    ObjectId
} = require('mongodb');


var equimentTypeSchema = mongoose.Schema({
    name: String,
    user_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model(COLLECTION_NAME, equimentTypeSchema);
