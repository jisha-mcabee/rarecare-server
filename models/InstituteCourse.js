const mongoose = require('mongoose');

const instituteCourseSchema = new mongoose.Schema(
  {
    stream: { type: String, required: true },
    institute: { type: String, required: true },
    courseType: { type: String, required: true },
    courseName: { type: String, required: true },
    maxFees: { type: Number, required: true },
    eligibilityLevel: { type: String, required: true },
    otherEligibilityCriteria: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InstituteCourse', instituteCourseSchema);
