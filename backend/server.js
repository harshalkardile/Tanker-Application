const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const buildingRoutes = require('./routes/building.routes.js');
const deliveryRoutes = require('./routes/delivery.routes.js');
const reportRoutes = require('./routes/report.routes.js');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/buildings', buildingRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));