const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ ONLY pass functions to router.get
router.get('/:id', verifyToken, getUserProfile);

module.exports = router;
