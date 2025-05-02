const db = require('../db');

// Get all risks
async function getRisks(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM risks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch risks' });
  }
}

// Create a new risk
async function createRisk(req, res) {
  const { project, description, probability, impact, type, controlPerformance, issueImpact, likelihood } = req.body;

  if (!project || !description || !probability || !impact) {
    return res.status(400).json({ error: 'All required fields must be provided.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO risks (project, description, probability, impact, type, controlPerformance, issueImpact, likelihood) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [project, description, probability, impact, type, controlPerformance, issueImpact, likelihood]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create risk.' });
  }
}

// Update an existing risk
async function updateRisk(req, res) {
  const { id } = req.params;
  const { project, description, probability, impact, type, controlPerformance, issueImpact, likelihood } = req.body;

  if (!project || !description || !probability || !impact) {
    return res.status(400).json({ error: 'All required fields must be provided.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE risks SET project = ?, description = ?, probability = ?, impact = ?, type = ?, controlPerformance = ?, issueImpact = ?, likelihood = ? WHERE id = ?',
      [project, description, probability, impact, type, controlPerformance, issueImpact, likelihood, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Risk not found' });
    }

    res.json({ message: 'Risk updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update risk.' });
  }
}

// Delete a risk
async function deleteRisk(req, res) {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM risks WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Risk not found' });
    }
    res.json({ message: 'Risk deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete risk' });
  }
}

module.exports = { getRisks, createRisk, updateRisk, deleteRisk };
