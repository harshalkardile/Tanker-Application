const express = require('express');
const { addDelivery, getDeliveriesByDate } = require('../controllers/delivery.controller.js');
const router = express.Router();

router.post('/', addDelivery);
router.get('/:date', getDeliveriesByDate);

module.exports = router;