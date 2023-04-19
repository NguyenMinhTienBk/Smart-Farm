const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  device_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Device", deviceSchema);
