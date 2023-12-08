// client/src/components/AdminRegistration.js

import React, { useState } from 'react';
import axios from 'axios';

const AdminRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:5001/auth/createAdmin', {
        username,
        password,
      });

      console.log(response.data);
      // Handle respons atau navigasi setelah registrasi admin berhasil
    } catch (error) {
      console.error('Admin registration error:', error.response.data.message);
      // Handle kesalahan registrasi admin
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAdminRegistration}>
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegistration;
