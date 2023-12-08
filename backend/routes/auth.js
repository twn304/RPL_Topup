// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../db');
const { verifyToken } = require('./authMiddleware');

// Endpoint untuk login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Dapatkan informasi pengguna atau admin dari database berdasarkan username
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? OR (SELECT * FROM admins WHERE username = ?)', [username, username]);

    const rowsArray = Array.from(rows);

    if (rowsArray.length < 1) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rowsArray[0];

    // Bandingkan password yang diberikan dengan password yang disimpan
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tentukan peran pengguna (user atau admin)
    const role = rowsArray.length >= 1 ? 'user' : 'admin';

    // Buat token JWT
    const accessToken = jwt.sign({ username: user.username, role, isAdmin: role === 'admin' }, 'your-secret-key', { expiresIn: '15m' });

    // Kirim respons sukses bersama dengan token JWT
    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint yang memerlukan autentikasi
router.get('/secure-endpoint', verifyToken, (req, res) => {
  res.json({ message: 'Secure endpoint accessed.' });
});

// Endpoint untuk pembuatan akun admin
router.post('/createAdmin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Enkripsi password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan informasi admin ke database
    await connection.execute('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
