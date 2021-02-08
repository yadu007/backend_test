let mongoose = require("mongoose");
let COLLECTION_NAME = "equipment_types";

let equimentTypeSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model(COLLECTION_NAME, equimentTypeSchema);

// meter skid