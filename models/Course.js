const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true},
  stream: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, 
  maxFees: { type: Number, required: true },
  minFees: { type: Number, required: true },
  eligibilityLevel: { type: String },
  otherEligibilityCriteria: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
