const mongoose = require("mongoose");

// Define the ValueManual schema
const treeSchema = new mongoose.Schema({
  treeName: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});

// Create the ValueManual model
const Tree = mongoose.model("tree", treeSchema);

module.exports = Tree;
