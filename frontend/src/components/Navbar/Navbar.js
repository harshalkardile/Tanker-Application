import React, { useState } from 'react';
import { User } from 'lucide-react';
import './Navbar.css';
// import Tanker from '../Navbar/tanker.png';

import Maharaj from '../Default-component/dnyaneshwarmaharaj.png';
import { useNavigate } from 'react-router-dom';
import {DefaultComponent} from '../Default-component/DefaultComponent';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Remove the authentication status from localStorage or sessionStorage
    localStorage.removeItem('authenticated'); // assuming you store this in localStorage

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <a href="/" className="brand-logo">
          <img src={Maharaj} alt="Brand Logo" />
        </a>
        
        {/* Centered Title */}
        <div className="navbar-title">Shree Yogiraj Water Supplier</div>
        
        {/* Profile Dropdown */}
        <div className="profile-section">
          <button onClick={toggleDropdown} className="profile-button">
            <User size={24} color="#666" />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <a href="/login" onClick={handleSignOut} className="dropdown-item">
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
