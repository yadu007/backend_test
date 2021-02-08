let mongoose = require("mongoose");
let COLLECTION_NAME = "projects";
const {
    ObjectId
} = require('mongodb');

let equimentTypeSchema = mongoose.Schema({
    name: String,
    user_id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model(COLLECTION_NAME, equimentTypeSchema);
