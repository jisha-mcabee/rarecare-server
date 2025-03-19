const Institute = require('../models/Institute');
const InstituteCourse = require('../models/InstituteCourse');
// Add new institute
// const addInstitute = async (req, res) => {
//   const { stream, description, instituteName, affiliationType, universityName } = req.body;

//   // Validate required fields
//   if (!stream || !description || !instituteName || !affiliationType) {
//     return res.status(400).json({ message: 'Stream, description, instituteName, and affiliationType are required' });
//   }

//   // Validate affiliation type
//   if (!['Affiliated', 'Deemed / Autonomous'].includes(affiliationType)) {
//     return res.status(400).json({ message: 'Invalid affiliation type. It should be either "Affiliated" or "Deemed / Autonomous"' });
//   }

//   try {
//     // Check if institute already exists
//     const existingInstitute = await Institute.findOne({ instituteName });
//     if (existingInstitute) {
//       return res.status(409).json({ message: 'Institute already exists' });
//     }

//     // Create new institute
//     const newInstitute = new Institute({
//       stream,
//       description,
//       instituteName,
//       affiliationType,
//       universityName
//     });

//     await newInstitute.save();

//     res.status(201).json({
//       message: 'Institute added successfully',
//       institute: newInstitute
//     });
//   } catch (error) {
//     console.error('Error adding institute:', error);

//     // Handle validation error
//     if (error.name === 'ValidationError') {
//       return res.status(400).json({
//         message: 'Validation error',
//         errors: error.errors
//       });
//     }

//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



const addInstitute = async (req, res) => {
  try {
    const { stream, description, instituteName, affiliationType, universityName } = req.body;
    const image = req.file ? req.file.path : null; // Get uploaded file path

    // Validate required fields
    if (!stream || !description || !instituteName || !affiliationType) {
      return res.status(400).json({ message: 'Stream, description, instituteName, and affiliationType are required' });
    }

    // Validate affiliation type
    if (!['Affiliated', 'Deemed / Autonomous'].includes(affiliationType)) {
      return res.status(400).json({ message: 'Invalid affiliation type. It should be either "Affiliated" or "Deemed / Autonomous"' });
    }

    // Check if institute already exists
    const existingInstitute = await Institute.findOne({ instituteName });
    if (existingInstitute) {
      return res.status(409).json({ message: 'Institute already exists' });
    }

    // Create new institute
    const newInstitute = new Institute({
      stream,
      description,
      instituteName,
      affiliationType,
      universityName,
      image // Save image path to DB
    });

    await newInstitute.save();

    res.status(201).json({
      message: 'Institute added successfully',
      institute: newInstitute
    });

  } catch (error) {
    console.error('Error adding institute:', error);

    // Handle multer-specific file upload errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size should not exceed 5MB' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new course
const addInstituteCourse = async (req, res) => {
  const {
    stream,
    institute,
    courseType,
    courseName,
    maxFees,
    eligibilityLevel,
    otherEligibilityCriteria
  } = req.body;

  if (!stream || !institute || !courseType || !courseName || !maxFees || !eligibilityLevel) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the referenced stream and institute exist
    // const existingStream = await Stream.findById(stream);
    // if (!existingStream) {
    //   return res.status(404).json({ message: 'Stream not found' });
    // }

    // const existingInstitute = await Institute.findById(institute);
    // if (!existingInstitute) {
    //   return res.status(404).json({ message: 'Institute not found' });
    // }

    // Create new course
    const newCourse = new InstituteCourse({
      stream,
      institute,
      courseType,
      courseName,
      maxFees,
      eligibilityLevel,
      otherEligibilityCriteria
    });

    await newCourse.save();

    res.status(201).json({
      message: 'Course added successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Error adding course:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const getInstituteCourseDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the course by ID and populate referenced fields
      const course = await InstituteCourse.findById(id)
        .populate('stream', 'name description') // Populate stream details
        .populate('institute', 'instituteName universityName affiliationType'); // Populate institute details
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.status(200).json({ course });
    } catch (error) {
      console.error('Error fetching course details:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const listInstitutes = async (req, res) => {
    try {
      // Fetch instituteName and _id fields
      const institutes = await Institute.find().select('instituteName _id');
  
      if (!institutes.length) {
        return res.status(404).json({ message: 'No institutes found' });
      }
  
      res.status(200).json(institutes);
    } catch (error) {
      console.error('Error fetching institutes:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  const listStreams = async (req, res) => {
    try {
      // Fetch stream and instituteName with id
      const streams = await Institute.find().select('stream instituteName');
  
      if (!streams.length) {
        return res.status(404).json({ message: 'No streams found' });
      }
  
      // Group streams by instituteName
      const groupedStreams = streams.reduce((acc, stream) => {
        const instituteName = stream.stream || 'Unknown';
  
        if (!acc[instituteName]) {
          acc[instituteName] = [];
        }
  
        // Add stream and id to the instituteName group
        acc[instituteName].push({ id: stream._id, stream: stream.instituteName });
  
        return acc;
      }, {});
  
      // Convert the grouped object into an array of objects
      const result = Object.keys(groupedStreams).map((stream) => ({
        stream,
        streams: groupedStreams[stream],
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching streams:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  
const getCoursesByInstituteAndStream = async (req, res) => {
  const { instituteName, stream } = req.query;
console.log( instituteName, stream );

  if (!instituteName || !stream) {
    return res.status(400).json({ message: 'Institute name and stream are required' });
  }

  try {
    // Find courses matching the instituteName and stream
    const courses = await InstituteCourse.find({
      institute: instituteName,
      stream: stream
    });

    if (!courses.length) {
      return res.status(404).json({ message: 'No courses found for the provided institute and stream' });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addInstitute ,addInstituteCourse ,getInstituteCourseDetails,listInstitutes,listStreams,getCoursesByInstituteAndStream };
