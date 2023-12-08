// Import modul dan file yang diperlukan
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Import koneksi dari file db.js
const connection = require('./db');
const app = express();
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('./routes/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../assets');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// Menggunakan middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk registrasi
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Enkripsi password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan informasi pengguna ke database
    await connection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Endpoint validasi Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Dapatkan informasi pengguna atau admin dari database berdasarkan username
    const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

    const [adminRows] = await connection.execute('SELECT * FROM admins WHERE username = ?', [username]);

    const rowsArray = Array.from(rows);
    const adminRowsArray = Array.from(adminRows);

    if (rowsArray.length < 1 && adminRowsArray.length < 1) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let user = null;
    if (rowsArray.length >= 1) {
      user = rowsArray[0];
    } else if (adminRowsArray.length >= 1) {
      user = adminRowsArray[0];
    }

    // Bandingkan password yang diberikan dengan password yang disimpan
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tentukan peran pengguna (user atau admin)
    const role = adminRowsArray.length >= 1 ? 'admin' : 'user';

    // Buat token JWT
    const accessToken = jwt.sign({ username: user.username, role }, 'your-secret-key', { expiresIn: '15m' });

    // Kirim respons sukses bersama dengan token JWT
    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/secure-endpoint', verifyToken, (req, res) => {
  res.json({ message: 'Secure endpoint accessed.' });
});


// Endpoint untuk pembuatan akun admin
app.post('/auth/createAdmin', async (req, res) => {
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

// EndPoint Add item
app.post('/api/addItem', upload.single('image'), async (req, res) => {
  const { gameName, itemName, itemDetails } = req.body;
  const imagePath = req.file.path; // Path file gambar

  try {
    // Simpan informasi item ke database, termasuk path gambar
    const [result] = await connection.execute(
      'INSERT INTO items (game_name, item_name, item_details, image_path) VALUES (?, ?, ?, ?)',
      [gameName, itemName, itemDetails, imagePath]
    );

    res.status(201).json({ message: 'Item berhasil ditambahkan', itemId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// EndPoint Delete item
app.delete('/api/deleteItem/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Hapus item dari database berdasarkan itemId
    await connection.execute('DELETE FROM items WHERE id = ?', [itemId]);

    res.status(200).json({ message: 'Item berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/* OLD ADD ITEM API
app.post('/api/addItem', async (req, res) => {
  const { gameName, itemName, itemDetails } = req.body;

  try {
    // Simpan informasi item ke database
    const [result] = await connection.execute('INSERT INTO items (game_name, item_name, item_details) VALUES (?, ?, ?)', [gameName, itemName, itemDetails]);

    res.status(201).json({ message: 'Item berhasil ditambahkan', itemId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

// EndPoint mengambil untuk GameDetails dan ItemVariants
app.get('/api/getItems/:gameName', async (req, res) => {
  const { gameName } = req.params;

  try {
    // Dapatkan item dari database berdasarkan nama game
    const [rows] = await connection.execute('SELECT * FROM items WHERE game_name = ?', [gameName]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint untuk mendapatkan semua item
app.get('/api/getItems', async (req, res) => {
  try {
    // Dapatkan semua item dari database
    const [rows] = await connection.execute('SELECT * FROM items');

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/addItemVariant', async (req, res) => {
  const { itemId, nominal, price } = req.body;

  try {
    // Simpan variasi item ke database
    await connection.execute('INSERT INTO item_variants (item_id, nominal, price) VALUES (?, ?, ?)', [itemId, nominal, price]);

    res.status(201).json({ message: 'Variasi item berhasil ditambahkan' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get item variants by item ID
app.get('/api/getItemVariants/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    // Dapatkan variasi item dari database berdasarkan ID item
    const [rows] = await connection.execute('SELECT * FROM item_variants WHERE item_id = ?', [itemId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Menentukan port yang akan digunakan
const PORT = process.env.PORT || 5001;

app.use('/assets', express.static('../assets'));

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
