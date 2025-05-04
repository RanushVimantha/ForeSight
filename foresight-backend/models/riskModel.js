const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Project = require('./projectModel');

const Risk = sequelize.define('Risk', {
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING },

    probability: {
        type: DataTypes.INTEGER,
        defaultValue: 3,    // 1 to 5
        validate: { min: 1, max: 5 }
    },

    impact: {
        type: DataTypes.INTEGER,
        defaultValue: 3,    // 1 to 5
        validate: { min: 1, max: 5 }
    },

    status: {
        type: DataTypes.ENUM('Open', 'Monitoring', 'Closed'),
        defaultValue: 'Open'
    }
});

// Relationship: Risk → Project
Risk.belongsTo(Project, { foreignKey: 'project_id' });

module.exports = Risk;
