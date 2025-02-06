// Format date to YYYY-MM-DD
exports.formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };
  
  // Calculate total cost for deliveries
  exports.calculateTotalCost = (numberOfTankers, chargePerTanker) => {
    return numberOfTankers * chargePerTanker;
  };