import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin, history }) => {
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

      onLogin(userData);

      // Store the access token in local storage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userRole',userData.role);

      if (userData.role === 'admin') {
        history.push('/admin/dashboard');
      }else{
        history.push('/dashboard');
      }

      // Redirect to the dashboard after successful login
      history.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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