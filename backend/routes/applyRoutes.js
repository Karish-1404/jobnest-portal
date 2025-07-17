const express = require('express');
const multer = require('multer');
const { cloudinary, storage } = require('../utils/cloudinary'); // Use utils folder
const { submitApplication } = require('../controllers/applyController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({ storage }); // Cloudinary storage

router.post('/', authenticateToken, upload.single('resume'), submitApplication);

module.exports = router;
