// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      // Validasi input
      if (!username || !password) {
        setError('Username dan password harus diisi.');
        return;
      }

      const response = await axios.post('http://localhost:5001/auth/register', {
        username,
        password,
      });
  
      console.log(response.data);
      // Handle registrasi berhasil, misalnya, navigasi ke halaman login
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
      // Handle kesalahan registrasi
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form>
          <input placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
          <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;