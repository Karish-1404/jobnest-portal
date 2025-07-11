import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './AuthForm.css';
import bgImage from './assets/job-bg.jpg'; 

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await axios.post(`https://jobnest-backend-qsn7.onrender.com${endpoint}`, formData);
      setMessage(res.data.message);
      if (isLogin && res.data.token) {
        localStorage.setItem('token', res.data.token);

       
        const redirectPath = location.state?.from || '/';
        navigate(redirectPath);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      className="auth-page"
      style={{
        background: `url(${bgImage}) no-repeat center center/cover`,
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
     
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(240, 240, 240, 0.7)',
          zIndex: 1
        }}
      />

      
      <div className="auth-form-container" style={{ position: 'relative', zIndex: 2 }}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="view-btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1rem' }}>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            onClick={handleToggle}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              padding: 0,
              fontWeight: 'bold'
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
