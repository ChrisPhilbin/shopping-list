const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  inCart: Boolean,
  tripId: String,
});

itemSchema.statics.updateItem = function (id, inCart) {
  return this.findById(id).then((item) => {
    item.inCart = inCart;
    return item.save();
  });
};

module.exports = mongoose.model("Item", itemSchema);
