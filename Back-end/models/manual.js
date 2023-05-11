const mongoose = require("mongoose");

// Define the ValueManual schema
const valueManualSchema = new mongoose.Schema({
  waterAmount: {
    type: String,
  },
  time: {
    type: String,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  selectedHour: {
    type: Date,
    required: true,
  },
  selectedValue: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Create the ValueManual model
const ValueManual = mongoose.model("manuals", valueManualSchema);

module.exports = ValueManual;
