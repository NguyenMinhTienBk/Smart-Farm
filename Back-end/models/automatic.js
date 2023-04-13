const mongoose = require("mongoose");

const automaticSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  selectedPlant: {
    type: String,
    required: true, // thay đổi require thành required
  },
  selectedSystem: {
    type: String,
    required: true, // thay đổi require thành required
  },
});

automaticSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

module.exports = mongoose.model("Automatic", automaticSchema); // đổi tên model thành "Automatic" (nếu thích)
