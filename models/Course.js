const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream', required: true },
  eligibility: { type: String, required: true },
  otherEligibilityCriteria: { type: String },
  maxFees: { type: Number, required: true },
  minFees: { type: Number, required: true },
  duration: { type: String, required: true }, // Example: "3 Years"
  type: { type: String, enum: ['Full-Time', 'Part-Time'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
