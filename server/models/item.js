const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  inCart: Boolean,
  tripId: String,
});

module.exports = mongoose.model("Item", itemSchema);
