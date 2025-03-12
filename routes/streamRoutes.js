const express = require('express');
const { addStream, updateStream, listStreams } = require('../controllers/streamController');
const auth = require('../middileware/authMiddleware');

const router = express.Router();

router.post('/add', auth, addStream);
router.put('/update/:id', auth, updateStream);
router.get('/list', auth, listStreams);

module.exports = router;
