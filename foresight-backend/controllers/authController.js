const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/login
async function login(req, res) {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login error' });
  }
}

// POST /api/auth/change-password
async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "Old and new passwords are required." });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: "Old password is incorrect." });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to change password." });
  }
}

module.exports = { login, changePassword };
