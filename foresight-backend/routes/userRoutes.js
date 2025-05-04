const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const { authenticate } = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');

//  Get all users
router.get('/', authenticate, async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role', 'status'] });
    res.json(users);
});

//  Create new user
router.post('/', authenticate, async (req, res) => {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password_hash: hash,
        role: role || 'User',
        status: 'Active'
    });

    res.status(201).json(user);
});

// Update user status
router.put('/:id', authenticate, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.json({ message: 'User updated', user });
});
// Delete user
router.delete('/:id', authenticate, async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
});
// Get current user's profile
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: ['id', 'username', 'email', 'role', 'status']
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error('Failed to get profile:', error);
        res.status(500).json({ message: 'Failed to load profile' });
    }
});




module.exports = router;
