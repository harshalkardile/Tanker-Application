const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  buildingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Building', 
    required: true 
  },
  invoiceNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },
  timeOfDelivery: { 
    type: String, 
    enum: ['Morning', 'Afternoon', 'Evening'], 
    required: true 
  },
  numberOfTankers: { 
    type: Number, 
    required: true 
  },
  date: {
    type: String, // Store date as a string
    default: () => new Date().toISOString().split('T')[0], // Default to current date if not provided
  },
  totalCost: { 
    type: Number, 
    required: true 
  },
  tankerSize: { 
    type: String, 
    enum: ['5000', '10000'], // Ensure that only 5000 or 10000 is accepted
    required: true
  },
  price: { 
    type: Number, 
    required: false, // Can be omitted, will default based on the building's prices
  }
});

// Pre-save middleware to set default price if not provided
deliverySchema.pre('save', async function(next) {
  if (!this.price) {
    try {
      // Fetch the building to get its prices
      const building = await mongoose.model('Building').findById(this.buildingId);
      
      if (building && building.chargePerTanker && building.chargePerTanker.length > 0) {
        // Set the first price from the building's chargePerTanker array
        this.price = building.chargePerTanker[0]; // Use the first price in the array
      }
    } catch (error) {
      console.error('Error setting default price:', error);
    }
  }
  next();
});

module.exports = mongoose.model('Delivery', deliverySchema);
