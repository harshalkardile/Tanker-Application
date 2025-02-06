const Building = require('../models/Building');

// Add a new building
exports.addBuilding = async (req, res) => {
  try {
    console.log(req.body);

    // Ensure chargePerTanker is an array and contains at least one price
    if (!Array.isArray(req.body.chargePerTanker) || req.body.chargePerTanker.length === 0) {
      return res.status(400).json({ message: 'chargePerTanker must be a non-empty array' });
    }

    const { name, address, chargePerTanker } = req.body;
    const building = new Building({ name, address, chargePerTanker });
    console.log(building);
    await building.save();
    res.status(201).json(building);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all buildings
exports.getAllBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};