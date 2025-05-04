const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('Active', 'Planning', 'Completed', 'On Hold'),
        defaultValue: 'Planning'
    },
    duration_days: {
        type: DataTypes.INTEGER,
        defaultValue: 30
    },
    team_size: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    budget_lkr: {
        type: DataTypes.INTEGER,
        defaultValue: 100000
    },
    scope_description: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'projects'
});

module.exports = Project;
