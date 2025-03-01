const express = require('express');
const { addDelivery, getAllDeliveries, deleteDeliveryById, getDeliveriesByDate } = require('../controllers/delivery.controller.js');
const router = express.Router();

router.post('/', addDelivery);
router.get('/', getAllDeliveries);
router.get('/:date', getDeliveriesByDate);
router.delete('/:id', deleteDeliveryById);

module.exports = router;