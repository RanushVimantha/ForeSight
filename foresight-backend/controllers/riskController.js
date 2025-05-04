const Risk = require('../models/riskModel');

exports.getAllRisks = async (req, res) => {
    try {
        const risks = await Risk.findAll();
        res.json(risks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch risks' });
    }
};

exports.getRiskById = async (req, res) => {
    try {
        const risk = await Risk.findByPk(req.params.id);
        if (!risk) return res.status(404).json({ message: 'Risk not found' });
        res.json(risk);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch risk' });
    }
};

exports.createRisk = async (req, res) => {
    try {
        const risk = await Risk.create(req.body);
        res.status(201).json({ message: 'Risk created', risk });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create risk' });
    }
};

exports.updateRisk = async (req, res) => {
    try {
        const risk = await Risk.findByPk(req.params.id);
        if (!risk) return res.status(404).json({ message: 'Risk not found' });

        await risk.update(req.body);
        res.json({ message: 'Risk updated', risk });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update risk' });
    }
};

exports.deleteRisk = async (req, res) => {
    try {
        const risk = await Risk.findByPk(req.params.id);
        if (!risk) return res.status(404).json({ message: 'Risk not found' });

        await risk.destroy();
        res.json({ message: 'Risk deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete risk' });
    }
};
