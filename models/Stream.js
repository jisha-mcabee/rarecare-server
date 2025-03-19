const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stream", streamSchema);
