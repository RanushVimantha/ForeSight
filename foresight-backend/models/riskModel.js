const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Project = require('./projectModel');

const Risk = sequelize.define('Risk', {
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },
    severity: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium'
    },
    status: {
        type: DataTypes.ENUM('Open', 'Monitoring', 'Closed'),
        defaultValue: 'Open'
    }
});

// Relationship: Risk → Project
Risk.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = Risk;
