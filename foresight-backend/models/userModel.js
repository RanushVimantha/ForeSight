const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    email: { type: DataTypes.STRING, unique: true },
    password_hash: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('Admin', 'User'), defaultValue: 'User' },
    status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' }
});

module.exports = User;
