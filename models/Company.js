const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  linkedinProfile: { type: String },
  emails: [{ type: String }],
  phoneNumbers: [{ type: String }],
  comments: { type: String },
  communicationPeriodicity: { type: Number, required: true }, // in days
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);