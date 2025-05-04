const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// TEMP route to create Ranush user
router.get('/create-ranush', async (req, res) => {
    const email = 'ranushvimantha1@gmail.com';
    const password = '123';

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.json({ message: 'Ranush user already exists' });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
        username: 'ranush',
        email,
        password_hash: hash,
        role: 'User',
        status: 'Active'
    });

    res.json({ message: 'Ranush user created', email, password });
});


// ✅ Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
