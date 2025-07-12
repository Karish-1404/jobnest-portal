import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaEye } from 'react-icons/fa';
import './Jobs.css';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jobnest-backend-qsn7.onrender.com/api/jobs/all')
      .then(res => setJobs(res.data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(job => !filter || job.location === filter);

  const uniqueLocations = [...new Set(jobs.map(job => job.location))];

  const getPostedDaysAgo = (dateString) => {
  const posted = new Date(dateString);
  const today = new Date();

  posted.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today - posted;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 0 ? 'Posted today' : `Posted ${diffDays} day(s) ago`;
};


  return (
    <div className="job-container">
      <div className="info-banner">
        <p>🔍 Use filters to narrow your job search by role or location</p>
      </div>

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search by title, company or location"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="job-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card custom-job-card">
            <div className="custom-top-row">
              <div className="logo-wrapper">
                {job.logo && (
                  <img
                    src={`http://localhost:5000/uploads/logo/${job.logo}`}
                    alt={`${job.company} logo`}
                    className="company-logo"
                  />
                )}
              </div>
              <div>
                <p className="company-name">{job.company}</p>
                <p className="posted-days">{getPostedDaysAgo(job.created_at)}</p>
              </div>
            </div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-location"><FaMapMarkerAlt className="icon" /> {job.location}</p>
            <p className="description">
              {job.description.length > 120
                ? job.description.slice(0, 120) + '...'
                : job.description}
            </p>
            <button
              onClick={() => navigate(`/job/${job.id}`)}
              className="view-btn"
            >
              <FaEye style={{ marginRight: '6px' }} />
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
