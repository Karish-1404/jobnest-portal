const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // adjust path if needed

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'job-logos',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
