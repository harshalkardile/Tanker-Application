const Delivery = require('../models/Delivery');
const Building = require('../models/Building');

// Add a new delivery
exports.addDelivery = async (req, res) => {
  try {
    const { buildingId, invoiceNumber, timeOfDelivery, numberOfTankers, tankerSize, price, date } = req.body;

    // Validate required fields
    if (!buildingId || !invoiceNumber || !timeOfDelivery || !numberOfTankers || !tankerSize) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Validate timeOfDelivery and tankerSize against enum values
    const validTimeOfDelivery = ['Morning', 'Afternoon', 'Evening'];
    if (!validTimeOfDelivery.includes(timeOfDelivery)) {
      return res.status(400).json({ message: 'Invalid timeOfDelivery. It must be one of "Morning", "Afternoon", or "Evening".' });
    }

    const validTankerSizes = ['5000', '10000'];
    if (!validTankerSizes.includes(tankerSize)) {
      return res.status(400).json({ message: 'Invalid tankerSize. It must be one of "5000" or "10000".' });
    }

    // Find the building and handle if not found
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ message: 'Building not found' });
    }

    // Default price to the first chargePerTanker if not provided or invalid
    let validPrice = price;
    if (!validPrice || isNaN(validPrice)) {
      validPrice = building.chargePerTanker[0]; // Default to the first price in chargePerTanker
    } else {
      validPrice = Number(validPrice); // Ensure it's a valid number
      if (isNaN(validPrice)) {
        return res.status(400).json({ message: 'Invalid price provided. Please provide a valid number.' });
      }
    }

    // Calculate total cost based on number of tankers and the price per tanker
    const totalCost = numberOfTankers * validPrice;

    // Create the new delivery object according to the schema
    const delivery = new Delivery({
      buildingId,
      invoiceNumber,
      timeOfDelivery,
      numberOfTankers,
      tankerSize,
      totalCost,
      price: validPrice,
      date: date || new Date().toISOString().split('T')[0], // Use selected date or default to current date
    });

    // Save the delivery to the database
    await delivery.save();

    // Return the created delivery in the response
    res.status(201).json(delivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    // Fetch all deliveries and populate building details
    const deliveries = await Delivery.find().populate('buildingId');
    
    // If no deliveries found, return empty array
    if (!deliveries.length) {
      return res.status(200).json([]);
    }

    // Format each delivery to include calculated totalCost
    const formattedDeliveries = deliveries.map(delivery => {
      const totalCost = delivery.numberOfTankers * (delivery.price || 0);
      return {
        ...delivery.toObject(),
        totalCost,
      };
    });

    res.status(200).json(formattedDeliveries);
  } catch (error) {
    console.error("Error fetching all deliveries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get deliveries by date
exports.getDeliveriesByDate = async (req, res) => {
  try {
      const { date } = req.params;

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
          return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }

      const deliveries = await Delivery.find({ date }).populate('buildingId');
      if (!deliveries.length) {
          return res.status(200).json([]);
      }

      const formattedDeliveries = deliveries.map(delivery => {
          const totalCost = delivery.numberOfTankers * (delivery.price || 0);
          return {
              ...delivery.toObject(),
              totalCost,
          };
      });

      res.status(200).json(formattedDeliveries);
  } catch (error) {
      console.error("Error fetching deliveries by date:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a delivery by ID
exports.deleteDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)

    // Find and delete the delivery
    const deletedDelivery = await Delivery.findByIdAndDelete(id);

    // If the delivery is not found, return 404
    if (!deletedDelivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({ message: "Delivery deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  
  