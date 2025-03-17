const express = require("express");
const {
  addInstitute,
  addInstituteCourse,
  getInstituteCourseDetails,
  listInstitutes,
} = require("../controllers/instituteController");
const auth = require("../middileware/authMiddleware");

const router = express.Router();

// Add institute endpoint
router.post("/add", addInstitute);
router.post("/addCourse", addInstituteCourse);
router.get("/getCourse/:id", getInstituteCourseDetails);
router.get("/listInstitutes", listInstitutes);

module.exports = router;
