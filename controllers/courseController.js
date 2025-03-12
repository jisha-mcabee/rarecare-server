const Course = require("../models/Course");
const Stream = require("../models/Stream");

// Add new course
const addCourse = async (req, res) => {
  const {
    name,
    stream,
    eligibility,
    otherEligibilityCriteria,
    maxFees,
    minFees,
    duration,
    type,
  } = req.body;

  try {
    // Validate if stream exists
    const existingStream = await Stream.findById(stream);
    if (!existingStream) {
      return res.status(400).json({ message: "Stream not found" });
    }

    // Check for existing course with the same name
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const newCourse = new Course({
      name,
      stream,
      eligibility,
      otherEligibilityCriteria,
      maxFees,
      minFees,
      duration,
      type,
    });

    await newCourse.save();

    res.status(201).json({ message: "Course added successfully", newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    stream,
    eligibility,
    otherEligibilityCriteria,
    maxFees,
    minFees,
    duration,
    type
  } = req.body;

  try {
    // Validate course ID format
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Check if course exists
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If stream is provided, validate it
    if (stream) {
      if (!mongoose.isValidObjectId(stream)) {
        return res.status(400).json({ message: 'Invalid stream ID' });
      }
      const existingStream = await Stream.findById(stream);
      if (!existingStream) {
        return res.status(400).json({ message: 'Stream not found' });
      }
    }

    // Update fields
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          stream,
          eligibility,
          otherEligibilityCriteria,
          maxFees,
          minFees,
          duration,
          type
        }
      },
      { new: true, omitUndefined: true }
    ).populate('stream', 'name');

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




const listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("stream", "name");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addCourse, updateCourse, listCourses };
