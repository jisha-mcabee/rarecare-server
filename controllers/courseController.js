
const mongoose = require('mongoose');
const Course = require("../models/Course");
const Stream = require("../models/Stream");
const Institute = require('../models/Institute');

const addCourse = async (req, res) => {
  const {
    name,
    stream,
    description,
    duration,
    maxFees,
    minFees,
    eligibilityLevel, // ✅ Updated to match schema
    otherEligibilityCriteria,
    courseType, // ✅ Updated to match schema
  } = req.body;

  try {
    // ✅ Check for existing course with the same name
    // const existingCourse = await Course.findOne({ name });
    // if (existingCourse) {
    //   return res.status(400).json({ message: 'Course already exists' });
    // }

    // ✅ Create new course
    const newCourse = new Course({
      name,
      stream,
      description,
      duration,
      maxFees,
      minFees,
      eligibilityLevel, // ✅ Updated field name
      otherEligibilityCriteria,
      courseType, // ✅ Updated field name
    });

    await newCourse.save();

    res.status(201).json({ message: 'Course added successfully', newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};





const updateCourse = async (req, res) => {
  const { id } = req.params; // ✅ Course ID from params
  const {
    name,
    stream, // ✅ Now a string
    eligibility,
    otherEligibilityCriteria,
    maxFees,
    minFees,
    duration,
    type,
  } = req.body;

  try {
    //✅ Validate if course exists
    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // ✅ Check for duplicate course name (excluding itself)
    const duplicateCourse = await Course.findOne({ name, _id: { $ne: id } });
    if (duplicateCourse) {
      return res.status(400).json({ message: 'Course name already exists' });
    }

    // ✅ Update course data
    existingCourse.name = name || existingCourse.name;
    existingCourse.stream = stream || existingCourse.stream;
    existingCourse.eligibility = eligibility || existingCourse.eligibility;
    existingCourse.otherEligibilityCriteria = otherEligibilityCriteria || existingCourse.otherEligibilityCriteria;
    existingCourse.maxFees = maxFees || existingCourse.maxFees;
    existingCourse.minFees = minFees || existingCourse.minFees;
    existingCourse.duration = duration || existingCourse.duration;
    existingCourse.type = type || existingCourse.type;

    await existingCourse.save();

    res.status(200).json({ message: 'Course updated successfully', updatedCourse: existingCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// const listCourses = async (req, res) => {
//   try {
//     // Fetch only course name and stream
//     const courses = await Course.find().select('name stream');

//     if (!courses.length) {
//       return res.status(404).json({ message: 'No courses found' });
//     }

//     // Group courses by stream
//     const groupedCourses = courses.reduce((acc, course) => {
//       const streamName = course.stream || 'Unknown';

//       if (!acc[streamName]) {
//         acc[streamName] = [];
//       }

//       // Add course name to the stream group
//       acc[streamName].push({ name: course.name });

//       return acc;
//     }, {});

//     // Convert the grouped object into an array of objects
//     const result = Object.keys(groupedCourses).map((stream) => ({
//       stream,
//       courses: groupedCourses[stream],
//     }));

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


const listCourses = async (req, res) => {
  try {
    // Fetch course name, stream, and id
    const courses = await Course.find().select('name stream _id');

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found' });
    }

    // Group courses by stream
    const groupedCourses = courses.reduce((acc, course) => {
      const streamName = course.stream || 'Unknown';

      if (!acc[streamName]) {
        acc[streamName] = [];
      }

      // Add course name and id to the stream group
      acc[streamName].push({ id: course._id, name: course.name });

      return acc;
    }, {});

    // Convert the grouped object into an array of objects
    const result = Object.keys(groupedCourses).map((stream) => ({
      stream,
      courses: groupedCourses[stream],
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllCoursesById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { addCourse, updateCourse, listCourses, getAllCoursesById };
