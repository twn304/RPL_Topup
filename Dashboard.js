import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [username, setUsername] = useState('');
  
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
  
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        setUsername(decodedToken.username);
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      // Redirect to the login page
      window.location.href = '/login'; // Using window.location.href for a full page reload
    };
  
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
        {/* Additional dashboard content */}
      </div>
    );
  };
  
  export default Dashboard;