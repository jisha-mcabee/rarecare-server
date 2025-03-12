const Stream = require('../models/Stream');

// Add new academic stream
const addStream = async (req, res) => {
  const { name } = req.body;

  try {
    const existingStream = await Stream.findOne({ name });
    if (existingStream) {
      return res.status(400).json({ message: 'Stream already exists' });
    }

    const newStream = new Stream({ name });
    await newStream.save();
    res.status(201).json({ message: 'Stream added successfully', newStream });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update academic stream
const updateStream = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedStream = await Stream.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedStream) {
      return res.status(404).json({ message: 'Stream not found' });
    }

    res.status(200).json({ message: 'Stream updated successfully', updatedStream });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// List all academic streams
const listStreams = async (req, res) => {
  try {
    const streams = await Stream.find();
    res.status(200).json({ streams });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { addStream, updateStream, listStreams };
