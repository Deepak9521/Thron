const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log('🔐 Token received:', token);
  console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET); // Only for debugging

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
