const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema(
  {
    stream: { type: String, required: true },
    description: { type: String, required: true },
    instituteName: { type: String, required: true, unique: true },
    affiliationType: { 
        type: String, 
        required: true, 
        enum: ['Affiliated', 'Deemed / Autonomous'] // Restrict values to these two options
      },
    universityName: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Institute', instituteSchema);
