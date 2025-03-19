const express = require('express');
const { addStream, deleteStreams, listStreams } = require('../controllers/streamController');
const upload = require("../middileware/upload");
const auth = require('../middileware/authMiddleware');


const router = express.Router();

// router.post('/add', auth, addStream);

router.post('/add', upload.single('image'), addStream);
router.delete('/deleteStreams', auth, deleteStreams);
router.get('/list', auth, listStreams);

module.exports = router;
