const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  storeName: String,
  date: String,
});

module.exports = mongoose.model("Trip", tripSchema);
