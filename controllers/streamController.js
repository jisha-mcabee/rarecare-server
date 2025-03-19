const Stream = require("../models/Stream");
const multer = require("multer");
// Add new academic stream
// const addStream = async (req, res) => {
//   const { name, description } = req.body;

//   if (!name || !description) {
//     return res.status(400).json({ message: 'Name and description are required' });
//   }

//   try {
//     const existingStream = await Stream.findOne({ name });
//     if (existingStream) {
//       return res.status(409).json({ message: 'Stream already exists' });
//     }

//     const newStream = new Stream({ name, description });
//     await newStream.save();

//     res.status(201).json({ message: 'Stream added successfully', stream: newStream });
//   } catch (error) {
//     console.error("Error adding stream:", error);

//     // Handling validation errors specifically
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         message: 'Validation error',
//         errors: error.errors,
//       });
//     }

//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const addStream = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.path : null; // Get file path if uploaded

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  try {
    const existingStream = await Stream.findOne({ name });
    if (existingStream) {
      return res.status(409).json({ message: "Stream already exists" });
    }

    const newStream = new Stream({ name, description, image });
    await newStream.save();

    res
      .status(201)
      .json({ message: "Stream added successfully", stream: newStream });
  } catch (error) {
    console.error("Error adding stream:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update academic stream
const deleteStreams = async (req, res) => {
  const { ids } = req.body; // Accept an array of stream IDs

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid stream IDs" });
  }

  try {
    const result = await Stream.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No streams found to delete" });
    }

    res.status(200).json({
      message: `${result.deletedCount} stream(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// List all academic streams
const listStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.status(200).json({ streams });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addStream, deleteStreams, listStreams };
