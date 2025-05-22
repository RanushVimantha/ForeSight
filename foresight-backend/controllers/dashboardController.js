const Project = require('../models/projectModel');
const Risk = require('../models/riskModel');

exports.getSummary = async (req, res) => {
  try {
    const projectCount = await Project.count();
    const riskCount = await Risk.count();
    const mitigationsCount = 23; // Replace with real count later
    const incidentsSolved = 40; // Replace with real logic

    res.json({
      projects: projectCount,
      risks: riskCount,
      mitigations: mitigationsCount,
      incidentsSolved
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};

exports.getKPIs = async (req, res) => {
  try {
    res.json({
      drift: 'Low',
      accuracy: '94%',
      uptime: '99.9%'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};

exports.getOpenRisks = async (req, res) => {
  try {
    const openRisks = await Risk.findAll({
      where: { status: 'Open' },
      order: [['impact', 'DESC']],
      limit: 5
    });

    res.json(openRisks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch open risks' });
  }
};
