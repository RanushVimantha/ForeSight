const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Active', 'Planning', 'Completed', 'On Hold'),
        allowNull: true,
        defaultValue: 'Planning'
    },
    duration_days: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    team_size: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    budget_lkr: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    scope_description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Project;
