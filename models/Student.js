const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
