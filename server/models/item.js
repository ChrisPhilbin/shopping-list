const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  inCart: Boolean,
});

module.exports = mongoose.model("Item", itemSchema);
