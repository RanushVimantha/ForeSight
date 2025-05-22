const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', dashboardController.getSummary);
router.get('/kpis', dashboardController.getKPIs);
router.get('/open-risks', dashboardController.getOpenRisks);

module.exports = router;
