// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Sesuaikan dengan secret key yang digunakan di auth.js

    // Pemeriksaan peran atau isAdmin
    if (decoded.role === 'admin') {
      // Izinkan akses admin
      req.user = decoded;
      next();
    } else {
      // Tidak diizinkan untuk akses
      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { verifyToken };

// authMiddleware.js
/*const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');

    // Pemeriksaan peran atau isAdmin
    if (decoded.isAdmin) {
      // Izinkan akses admin
      req.user = decoded;
      next();
    } else {
      // Tidak diizinkan untuk akses
      return res.status(403).json({ message: 'Access forbidden. Insufficient permissions.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { verifyToken };
*/
