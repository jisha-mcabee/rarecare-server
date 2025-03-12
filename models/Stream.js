const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },

}, { timestamps: true });

module.exports = mongoose.model('Stream', streamSchema);
