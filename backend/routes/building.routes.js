const express = require('express');
const { addBuilding, getAllBuildings, deleteBuildingById } = require('../controllers/Building.controller.js');
const router = express.Router();

router.post('/', addBuilding);
router.get('/', getAllBuildings);
router.delete('/:id', deleteBuildingById);  

module.exports = router;