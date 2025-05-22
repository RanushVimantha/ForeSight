// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/dbConfig');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const riskRoutes = require('./routes/riskRoutes');
const mitigationRoutes = require('./routes/mitigationRoutes'); // ✅ NEW

const app = express();

app.use(cors());
app.use(express.json());

// Sync models
require('./models/userModel');
require('./models/projectModel');
require('./models/riskModel');
require('./models/mitigationModel'); // ✅ NEW

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/risks', riskRoutes);
app.use('/api/mitigations', mitigationRoutes); // ✅ NEW

app.get('/', (req, res) => {
  res.send('ForeSight backend running!');
});

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database connected and tables synced.');
}).catch((err) => {
  console.error('❌ DB connection failed:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
