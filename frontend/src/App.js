// Temporary change to trigger Netlify redeploy

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './Home';       
import Jobs from './Jobs';
import PostJob from './PostJob';
import JobDetail from './JobDetail';
import AuthForm from './AuthForm';
import NotFound from './NotFound';
import Footer from './Footer';
import Navbar from './Navbar';

import './App.css';

function AppWrapper() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/jobs" element={<Jobs />} />    
        <Route path="/post" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
