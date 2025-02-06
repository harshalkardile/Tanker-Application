import React, { useState } from 'react';
import { User } from 'lucide-react';
import './Navbar.css';
import Maharaj from './tankericon.png';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
              <a href="#profile" className="dropdown-item">Your Profile</a>
              <a href="#settings" className="dropdown-item">Settings</a>
              <a href="#signout" className="dropdown-item">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
