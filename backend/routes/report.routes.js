const express = require('express');
const { getWeeklyReport, getMonthlyReport, getYearlyReport } = require('../controllers/report.controller.js');
const router = express.Router();

router.get('/weekly', getWeeklyReport);
router.get('/monthly', getMonthlyReport);
router.get('/yearly', getYearlyReport);

module.exports = router;