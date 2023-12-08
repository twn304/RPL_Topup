// Header.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className='header-container'>
      <header className='header-navbar'>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
    
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: '60px', height: 'auto' }} />
        </Link>

        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
      
      {/* Tombol Login di luar menu */}
      <Link to="/login" className="login-button" style={{ textDecoration: 'none', color: 'white' }}>
        <div>
          <span>Login</span>
        </div>
      </Link>

      {/* Tombol Daftar di luar menu */}
      <Link to="/register" className="register-button" style={{ textDecoration: 'none', color: 'white' }}>
        <div>
          <span>Daftar</span>
        </div>
      </Link>
      </header>
    </header>
    
  );
};

export default Header;
