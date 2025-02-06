const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  chargePerTanker: { type: [Number], required: true }, // Updated to store an array of numbers
});

module.exports = mongoose.model('Building', buildingSchema);
