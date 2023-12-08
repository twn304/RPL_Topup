import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Login = ({ onLogin, history, setLoggedInStatus, setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        username,
        password,
      });
  
      const userData = response.data;
      console.log('User Data:', userData);
  
      // Update the logged-in status and user data
      setLoggedInStatus(true); // Use consistent prop name here
      onLogin(userData);
  
      // Store the access token and user role in local storage
      localStorage.setItem('accessToken', userData.accessToken);
      localStorage.setItem('userRole', userData.role);
  
      if (userData.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/dashboard');
      }
  
      console.log(`Login successful.`);
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your username and password.');
    }
  };


  return (
    <div className='login-container'>
      <div className='login-content'>
      <h2>Login</h2>
      <div>
        <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    </div>
      
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Tulisan jika belum memiliki akun */}
      <p>
        Belum memiliki akun?{' '}
        <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
          Daftar
        </Link>{' '}
        sekarang!
      </p>
    </div>
  );
};

export default Login;
