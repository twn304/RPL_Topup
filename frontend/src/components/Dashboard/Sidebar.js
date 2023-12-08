import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', padding: '16px', backgroundColor: '#f0f0f0' }}>
      <h4>Menu</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/items">Items</Link>
        </li>
        {/* Tambahkan menu tambahan sesuai kebutuhan */}
      </ul>
    </div>
  );
};

export default Sidebar;
