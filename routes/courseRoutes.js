const express = require("express");
const {
  addCourse,
  listCourses,
  updateCourse,
} = require("../controllers/courseController");
const auth = require("../middileware/authMiddleware");

const router = express.Router();

router.post("/add", auth, addCourse);
router.get("/list", auth, listCourses);
router.put("/update/:id", auth, updateCourse);

module.exports = router;
