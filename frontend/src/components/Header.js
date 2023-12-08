// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo.png';

const Header = ({ user, onLogout, isLoggedIn, setLoggedInStatus }) => {
  return (
    <header className='header-container'>
      <header className='header-navbar'>
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: '60px', height: 'auto' }} />
        </Link>
        <nav>
          <ul>
            <Link to="/home" className="home-button"style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <span>Home</span>
              </div>
            </Link>

            {isLoggedIn && (
              <Link to="/dashboard" className="dashboard-button"style={{ textDecoration: 'none', color: 'white' }}>
                <div>
                  <span>Dashboard</span>
                </div>
              </Link>
            )}
          </ul>
        </nav>

        {!isLoggedIn ? (
          <Link to="/login" className="login-button" style={{ textDecoration: 'none', color: 'white' }}>
            <div>
              <span>Login</span>
            </div>
          </Link>
        ) : (
          <Link to="/" className="logout-button" onClick={() => { onLogout(); setLoggedInStatus(false); localStorage.removeItem('accessToken'); }} style={{ textDecoration: 'none', color: 'white' }}>
            <div>
              <span>Logout</span>
            </div>
          </Link>
      
        )}

        {!isLoggedIn && (
          <Link to="/register" className="register-button" style={{ textDecoration: 'none', color: 'white' }}>
            <div>
              <span>Daftar</span>
            </div>
          </Link>
        )}
      </header>
    </header>
  );
};

export default Header;
