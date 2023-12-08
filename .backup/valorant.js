import React, { useState } from 'react';
import './Valorant.css'; // Pastikan Anda memiliki file CSS ini

const Valorant = () => {
  const [riotId, setRiotId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const items = [
    { points: 125, price: 15000 },
    { points: 420, price: 50000 },
    { points: 700, price: 80000 },
    { points: 1375, price: 150000 },
    // tambahkan item lainnya di sini
  ];

  const payments = [
    { method: 'DANA', logo: 'logoDANA.png' },
    { method: 'ShopeePay', logo: 'logoShopeePay.png' },
    { method: 'BNI Syariah', logo: 'logoBNISyariah.png' },
    // tambahkan metode pembayaran lainnya di sini
  ];

  const handleItemClick = (item) => {
    // simpan item yang dipilih ke dalam state
    setSelectedItem(item);
  };

  const handlePaymentClick = (payment) => {
    // simpan metode pembayaran yang dipilih ke dalam state
    setSelectedPayment(payment);
  };

  return (
    <div className="container">
      <h1>Selamat datang</h1>
      <h2>Masukan Riot ID Anda</h2>
      <input
        type="text"
        placeholder="Masukkan Riot ID Anda"
        value={riotId}
        onChange={(e) => setRiotId(e.target.value)}
      />
      <h2>Pilih nominal satu jam terakhir</h2>
  
      <div className="grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${item === selectedItem ? 'selected' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <h3>{item.points} Points</h3>
            <p>Dari Rp. {item.price}</p>
          </div>
        ))}
      </div>
      <h2>Pilih Pembayaran</h2>
      <div className="grid">
        {payments.map((payment, index) => (
          <div
            key={index}
            className={`item ${payment === selectedPayment ? 'selected' : ''}`}
            onClick={() => handlePaymentClick(payment)}
          >
            <img src={payment.logo} alt={payment.method} />
            <p>{payment.method}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="selected-item">
          <h2>Anda telah memilih:</h2>
          <p>{selectedItem.points} Points for Rp. {selectedItem.price}</p>
        </div>
      )}
    </div>
  );
};

export default Valorant;