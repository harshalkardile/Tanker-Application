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

// Delete a building by ID
exports.deleteBuildingById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    // Find and delete the building by ID
    const deletedBuilding = await Building.findByIdAndDelete(id);

    // If the building is not found, return 404
    if (!deletedBuilding) {
      return res.status(404).json({ message: "Building not found" });
    }

    res.status(200).json({ message: "Building deleted successfully" });
  } catch (error) {
    console.error("Error deleting building:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
