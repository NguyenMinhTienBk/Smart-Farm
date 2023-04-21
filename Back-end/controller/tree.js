const Tree = require("../models/tree");

// Controller function for creating manual value
const createTree = async (req, res) => {
  try {
    const { treeName, selectedDate, email } = req.body;

    // Create a new instance of ValueManual model
    const valueManual = new Tree({
      treeName,
      selectedDate,
      email,
    });

    // Save the value manual to MongoDB
    await valueManual.save();

    res.json({ success: true, message: "Tree created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create tree",
      error: error.message,
    });
  }
};

// Controller function for getting manual value by email
const getTreeByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // Query MongoDB to get manual values by email
    const valueManuals = await Tree.find({ email });

    // Extract desired fields from valueManuals and create a new array of objects
    const result = valueManuals.map((tree) => {
      return {
        id: tree.id,
        treeName: tree.treeName,
        selectedDate: tree.selectedDate,
      };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tree by email",
      error: error.message,
    });
  }
};

const deleteTree = async (req, res) => {
  try {
    const id = req.params.id;

    // Query MongoDB to find and delete manual value by id
    await Tree.findByIdAndDelete(id);

    res.json({ success: true, message: "Value manual deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete value manual",
      error: error.message,
    });
  }
};

module.exports = { createTree, getTreeByEmail, deleteTree };
