// routes/mitigationRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/mitigationController');

router.post('/save', controller.saveMitigations);
router.get('/:projectId', controller.getMitigationsByProject);

module.exports = router;
