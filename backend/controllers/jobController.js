const db = require('../db');
const cloudinary = require('../utils/cloudinary');

exports.postJob = async (req, res) => {
  const { title, company, location, description } = req.body;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  let logoUrl = null;

  // Upload logo to Cloudinary if file exists
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'jobnest/logos' // Optional: Organize in Cloudinary folder
      });
      logoUrl = result.secure_url; // ✅ Use Cloudinary URL
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return res.status(500).json({ message: 'Error uploading logo to Cloudinary' });
    }
  }

  const now = new Date();
  const created_at = now.toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO jobs (title, company, location, description, logo, created_at) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [title, company, location, description, logoUrl, created_at], (err, result) => {
    if (err) {
      console.error('MySQL Error:', err);
      return res.status(500).json({ message: 'Server error while inserting job' });
    }
    res.status(200).json({ message: '✅ Job posted successfully', jobId: result.insertId });
  });
};
