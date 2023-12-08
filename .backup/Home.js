// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import PromotionSlider from '../components/PromotionSlider';
import imgValorant from '../assets/valorant.png';
import imgGame2 from '../assets/ml.png'; // Ganti dengan path gambar yang sesuai
import imgGame3 from '../assets/pubgm.jpg'; // Ganti dengan path gambar yang sesuai

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {/* Slider Promosi */}
      <PromotionSlider />

      <h1>Selamat Datang di Top-Up Valorant Shop</h1>
      <p>Temukan penawaran terbaik untuk top-up Valorant di sini!</p>
      {/* Promo atau Banner */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/games/valorant">
          <img
            src={imgValorant}
            alt="Valorant"
            style={{
              width: '200px',
              height: '260px',
              border: '2px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Link>

        <Link to="/games/game2">
          <img
            src={imgGame2}
            alt="Promo Banner 2"
            style={{
              width: '200px',
              height: '260px',
              border: '2px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Link>

        <Link to="/games/game3">
          <img
            src={imgGame3}
            alt="Promo Banner 3"
            style={{
              width: '200px',
              height: '260px',
              border: '2px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
