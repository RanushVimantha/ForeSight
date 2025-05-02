const express = require('express');
const router = express.Router();
const { login, changePassword } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

router.post('/login', login);
router.post('/change-password', authenticateToken, changePassword);

module.exports = router;
