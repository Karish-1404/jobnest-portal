const db = require('../db');

exports.postJob = (req, res) => {
  const { title, company, location, description } = req.body;

  // Use Cloudinary URL if available
  const logo = req.file && req.file.path ? req.file.path : null;

  if (!title || !company || !location || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const now = new Date();
  const created_at = now.toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO jobs (title, company, location, description, logo, created_at) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, company, location, description, logo, created_at], (err, result) => {
    if (err) {
      console.error('🔴 MySQL Error:', err);
      return res.status(500).json({ message: 'Server error while inserting job' });
    }
    res.status(200).json({ message: '✅ Job posted successfully', jobId: result.insertId });
  });
};

exports.getJobs = (req, res) => {
  db.query('SELECT *, created_at FROM jobs', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching jobs' });
    res.status(200).json(results);
  });
};

exports.getJobById = (req, res) => {
  const jobId = req.params.id;
  db.query('SELECT *, created_at FROM jobs WHERE id = ?', [jobId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching job' });
    if (results.length === 0) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(results[0]);
  });
};
