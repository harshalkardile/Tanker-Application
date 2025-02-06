const express = require('express');
const { addBuilding, getAllBuildings } = require('../controllers/Building.controller.js');
const router = express.Router();

router.post('/', addBuilding);
router.get('/', getAllBuildings);

module.exports = router;