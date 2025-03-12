const Student = require('../models/Student');

const registerStudent = async (req, res) => {
  const { name, email, phoneNumber, location, service, message } = req.body;

  try {
    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already registered' });
    }

    const student = new Student({
      name,
      email,
      phoneNumber,
      location,
      service,
      message
    });

    await student.save();

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const listStudents = async (req, res) => {
    try {
      const students = await Student.find().sort({ createdAt: -1 }); // Sort by newest first
      res.status(200).json({ students });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

module.exports = { registerStudent,listStudents  };
