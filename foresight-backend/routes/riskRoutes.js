const express = require('express');
const router = express.Router();
const Risk = require('../models/riskModel');
const { authenticate } = require('../middlewares/authMiddleware');

// ✅ Get all risks
router.get('/', authenticate, async (req, res) => {
    const risks = await Risk.findAll();
    res.json(risks);
});

// ✅ Create risk
router.post('/', authenticate, async (req, res) => {
    const { title, category, status } = req.body;

    const risk = await Risk.create({
        title,
        category,
        status: status || 'Open'
    });

    res.status(201).json(risk);
});

// ✅ Update risk
router.put('/:id', authenticate, async (req, res) => {
    const risk = await Risk.findByPk(req.params.id);
    if (!risk) return res.status(404).json({ message: 'Risk not found' });

    await risk.update(req.body);
    res.json({ message: 'Risk updated', risk });
});

// ✅ Delete risk
router.delete('/:id', authenticate, async (req, res) => {
    const risk = await Risk.findByPk(req.params.id);
    if (!risk) return res.status(404).json({ message: 'Risk not found' });

    await risk.destroy();
    res.json({ message: 'Risk deleted' });
});

module.exports = router;
