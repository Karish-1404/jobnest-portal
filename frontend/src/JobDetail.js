import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaFileUpload } from 'react-icons/fa';
import bgImage from './assets/job-bg.jpg';
import './Jobs.css';

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [applicant, setApplicant] = useState({ name: '', email: '' });

  useEffect(() => {
    axios.get(`https://jobnest-backend-qsn7.onrender.com/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error('Error loading job:', err));
  }, [id]);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to apply');
      return navigate('/auth');
    }

    if (!resumeFile || !applicant.name || !applicant.email) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', applicant.name);
    formData.append('email', applicant.email);
    formData.append('resume', resumeFile);
    formData.append('jobId', id);

    try {
      await axios.post('https://jobnest-backend-qsn7.onrender.com/api/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setSubmitted(true);
      setApplicant({ name: '', email: '' });
      setResumeFile(null);
      setError('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  const getPostedDaysAgo = (dateString) => {
    const posted = new Date(dateString);
    const today = new Date();

    posted.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - posted;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 0 ? 'Posted today' : `Posted ${diffDays} day(s) ago`;
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div
      className="job-detail-bg"
      style={{
        background: `url(${bgImage}) no-repeat center center/cover`,
        minHeight: '100vh',
        padding: '4rem 1rem',
        position: 'relative'
      }}
    >
      <div className="overlay" />

      <div className="job-detail-container">
        <div className="job-card full-width job-card-flex">
          {job.logo && (
            <img
              src={`https://jobnest-backend-qsn7.onrender.com/uploads/logo/${job.logo}`}
              alt={`${job.company} logo`}
              className="company-logo"
            />
          )}
          <div className="job-info">
            <h2>{job.title}</h2>
            <p><FaBuilding className="icon" /> {job.company}</p>
            <p><FaMapMarkerAlt className="icon" /> {job.location}</p>
            <p style={{ fontSize: '0.9rem', color: '#007bff' }}>
              {getPostedDaysAgo(job.created_at)}
            </p>
            <p style={{ marginTop: '1rem' }}>{job.description}</p>
          </div>
        </div>

        <div className="form-card full-width">
          <h3 className="form-heading">Apply for this Job</h3>
          {submitted ? (
            <div className="success-message">✅ Application submitted successfully!</div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-input"
                value={applicant.name}
                onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-input"
                value={applicant.email}
                onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
              />
              <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                <FaFileUpload style={{ marginRight: '6px' }} /> Upload Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="form-input"
                required
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button type="submit" className="view-btn">Submit Application</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
