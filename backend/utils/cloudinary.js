const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'djkrv5zee',  
  api_key: '178532493722967',
  api_secret: 'owjybmIki9OxtYqCiOgsYk5jOaM'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'jobnest_logos',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

module.exports = { cloudinary, storage };
