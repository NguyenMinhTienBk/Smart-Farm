const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
  notify_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

notifySchema.statics.findById = function (notify_id) {
  return this.findOne({ notify_id });
};

module.exports = mongoose.model("Notify", notifySchema);
