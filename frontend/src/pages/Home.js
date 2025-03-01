import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="page-loader">
        <div className="loader-content">
          <div className="spinner"></div>
          <h2>Retriving information...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="main-layout">
        <div className="sidebar-container">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;