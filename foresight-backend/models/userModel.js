const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
    email: {
  type: DataTypes.STRING,
  allowNull: false
},
username: {
  type: DataTypes.STRING,
  allowNull: false
},

    password_hash: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('Admin', 'User'), defaultValue: 'User' },
    status: { type: DataTypes.ENUM('Active', 'Inactive'), defaultValue: 'Active' }
});

module.exports = User;
