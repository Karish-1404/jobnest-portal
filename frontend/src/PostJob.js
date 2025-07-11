import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from './assets/job-bg.jpg';
import './Jobs.css';

function PostJob() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const logoInputRef = useRef(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth', { state: { from: '/post' } });
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in first.');

    const formData = new FormData();
    formData.append('title', job.title);
    formData.append('company', job.company);
    formData.append('location', job.location);
    formData.append('description', job.description);
    if (logoFile) formData.append('logo', logoFile);

    axios.post('https://jobnest-backend-qsn7.onrender.com/api/jobs/post', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      alert('✅ Job posted successfully!');
      setJob({ title: '', company: '', location: '', description: '' });
      setLogoFile(null);
      if (logoInputRef.current) {
        logoInputRef.current.value = null; 
      }
    })
    .catch(err => {
      console.error('🔴 Axios error:', err);
      if (err.response) {
        alert(err.response.data.message || '❌ Server error');
      } else {
        alert('❌ Network error: ' + err.message);
      }
    });
  };

  if (isLoading) return null;

  return (
    <div style={{
      background: `url(${bgImage}) no-repeat center center/cover`,
      minHeight: '100vh',
      padding: '4rem 1rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(240, 240, 240, 0.7)', zIndex: 1
      }} />

      <div className="job-detail-container" style={{
        position: 'relative', zIndex: 2, maxWidth: '800px',
        margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem'
      }}>
        <div className="form-card">
          <h3 className="form-heading">Post a Job</h3>
          <form onSubmit={handleSubmit} className="auth-form" encType="multipart/form-data">
            <input className="form-input" type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} required />
            <input className="form-input" type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleChange} required />
            <input className="form-input" type="text" name="location" placeholder="Location" value={job.location} onChange={handleChange} required />
            <textarea className="form-input" name="description" placeholder="Job Description" value={job.description} onChange={handleChange} required rows="5" />
            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Upload Company Logo :</label>
            <input
              className="form-input"
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files[0])}
              ref={logoInputRef}
            />
            <button className="view-btn" type="submit">Post Job</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
