const ValueManual = require("../models/manual");

// Controller function for creating manual value
const createValueManual1 = async (req, res) => {
  try {
    const { waterAmount, selectedDate, selectedHour, selectedValue, email } =
      req.body;

    // Create a new instance of ValueManual model
    const valueManual = new ValueManual({
      waterAmount,
      selectedDate,
      selectedHour,
      selectedValue,
      email,
    });

    // Save the value manual to MongoDB
    await valueManual.save();

    res.json({ success: true, message: "Value manual created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create value manual",
      error: error.message,
    });
  }
};

const createValueManual2 = async (req, res) => {
  try {
    const { time, selectedDate, selectedHour, selectedValue, email } = req.body;

    // Create a new instance of ValueManual model
    const valueManual = new ValueManual({
      time,
      selectedDate,
      selectedHour,
      selectedValue,
      email,
    });

    // Save the value manual to MongoDB
    await valueManual.save();

    res.json({ success: true, message: "Value manual created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create value manual",
      error: error.message,
    });
  }
};

// Controller function for getting manual value by email
const getValueManualByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // Query MongoDB to get manual values by email
    const valueManuals = await ValueManual.find({ email });

    // Extract desired fields from valueManuals and create a new array of objects
    const result = valueManuals.map((valueManual) => {
      return {
        id: valueManual.id,
        waterAmount: valueManual.waterAmount,
        time: valueManual.time,
        selectedDate: valueManual.selectedDate,
        selectedHour: valueManual.selectedHour,
        selectedValue: valueManual.selectedValue,
      };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get manual values by email",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    // Query MongoDB to find and delete manual value by id
    await ValueManual.findByIdAndDelete(id);

    res.json({ success: true, message: "Value manual deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete value manual",
      error: error.message,
    });
  }
};

module.exports = {
  createValueManual1,
  createValueManual2,
  getValueManualByEmail,
  deleteTask,
};
