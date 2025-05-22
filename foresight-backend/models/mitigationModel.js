// models/mitigationModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Mitigation = sequelize.define('Mitigation', {
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  riskTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mitigation: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = Mitigation;
