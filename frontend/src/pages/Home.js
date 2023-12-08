import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PromotionSlider from '../components/PromotionSlider';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/getItems') // Ganti dengan URL API Anda
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {/* Slider Promosi */}
      <PromotionSlider />

      <h1>Selamat Datang di Top-Up Valorant Shop</h1>
      <p>Temukan penawaran terbaik untuk top-up Valorant di sini!</p>
      {/* Promo atau Banner */}
      <div style={{ display: 'flex', gap: '16px' }}>
        {items.map((item, index) => (
          <Link key={index} to={`/games/${item.game_name}`}>
            <img
              src={`http://localhost:5001/${item.image_path}`}
              alt={item.name}
              style={{
                width: '200px',
                height: '260px',
                border: '2px solid #ccc',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
