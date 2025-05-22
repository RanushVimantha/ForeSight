// controllers/mitigationController.js
const Mitigation = require('../models/mitigationModel');

exports.saveMitigations = async (req, res) => {
  try {
    const { projectId, risks, mitigations } = req.body;

    if (!projectId || !risks || !mitigations) {
      return res.status(400).json({ message: 'Missing data in request body' });
    }

    const entries = [];

    for (const title of risks.map(r => r.title)) {
      for (const mitigation of mitigations) {
        entries.push({
          projectId,
          riskTitle: title,
          mitigation
        });
      }
    }

    await Mitigation.bulkCreate(entries);
    res.status(200).json({ message: 'Mitigations saved successfully' });
  } catch (error) {
    console.error('❌ Failed to save mitigations:', error);
    res.status(500).json({ message: 'Error saving mitigations' });
  }
};

exports.getMitigationsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const results = await Mitigation.findAll({ where: { projectId } });
    res.json(results);
  } catch (error) {
    console.error('❌ Fetch error:', error);
    res.status(500).json({ message: 'Error fetching mitigations' });
  }
};
