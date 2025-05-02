const express = require('express');
const router = express.Router();
const { getRisks, createRisk, deleteRisk, updateRisk } = require('../controllers/risksController');
const authenticateToken = require('../middleware/auth');

router.get('/', getRisks);
router.post('/', authenticateToken, createRisk);
router.delete('/:id', authenticateToken, deleteRisk);
router.put('/:id', authenticateToken, updateRisk); 

module.exports = router;
