const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  sequence: { type: String, required: true },
  mandatoryFlag: { type: Boolean, required: true },
  date: { type: Date, required: true },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Communication", communicationSchema);
