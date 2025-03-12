const express = require('express');
const { registerStudent, listStudents } = require('../controllers/studentController');
const auth = require('../middileware/authMiddleware');

const router = express.Router();

router.post('/register', auth, registerStudent);
router.get('/list', auth, listStudents); // ✅ New route for fetching students

module.exports = router;
