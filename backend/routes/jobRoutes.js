const express = require('express');
const router = express.Router();
const multer = require('multer');

const { postJob, getJobs, getJobById } = require('../controllers/jobController');
const authenticateToken = require('../middleware/authMiddleware');

const upload = multer({ storage }); 


router.get('/all', getJobs);


router.post('/post', authenticateToken, upload.single('logo'), postJob);


router.get('/:id', getJobById);

module.exports = router;
