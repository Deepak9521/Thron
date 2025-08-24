const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

// ✅ Get current user and their posts
router.get('/me', verifyToken, getMe);

module.exports = router;
