require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const riskRoutes = require('./routes/riskRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Import models to sync tables
require('./models/userModel');
require('./models/projectModel');
require('./models/riskModel');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/risks', riskRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('ForeSight backend running!');
});

// Connect to DB and sync tables
sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database connected and tables synced.');
}).catch((err) => {
    console.error('❌ DB connection failed:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
