const express = require("express");
const upload = require("../middileware/upload");
const {
  addInstitute,
  addInstituteCourse,
  getInstituteCourseDetails,
  listInstitutes,
  listStreams,
  getCoursesByInstituteAndStream
} = require("../controllers/instituteController");
const auth = require("../middileware/authMiddleware");

const router = express.Router();

// Add institute endpoint
// router.post("/add", addInstitute);
router.post("/addCourse", addInstituteCourse);
router.get("/getCourse/:id", getInstituteCourseDetails);
router.get("/listInstitutes", listInstitutes);
router.post('/add', upload.single('image'), addInstitute);
router.get('/listStreams',listStreams)
router.get('/getCoursesByInstituteAndStream', getCoursesByInstituteAndStream);

module.exports = router;
