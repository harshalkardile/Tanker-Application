const Delivery = require('../models/Delivery');
const { startOfMonth, endOfMonth, format, differenceInDays, parseISO } = require('date-fns');

// Get weekly report
exports.getWeeklyReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "startDate and endDate are required" });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
        }

        const startDateParsed = parseISO(startDate);
        const endDateParsed = parseISO(endDate);

        const daysDifference = differenceInDays(endDateParsed, startDateParsed);
        if (daysDifference !== 6) {
            return res.status(400).json({ message: "The date range must be exactly 7 days" });
        }

        const deliveries = await Delivery.find({ date: { $gte: startDate, $lte: endDate } }).populate('buildingId');
        if (!deliveries.length) {
            return res.status(200).json([]);
        }

        const report = deliveries.reduce((acc, delivery) => {
            const buildingId = delivery.buildingId._id.toString();
            if (!acc[buildingId]) {
                acc[buildingId] = {
                    buildingId: delivery.buildingId._id,
                    buildingDetails: delivery.buildingId,
                    deliveries: [],
                    totalTankers: 0,
                    totalCost: 0,
                };
            }

            const deliveryCost = delivery.numberOfTankers * (delivery.price || 0);
            acc[buildingId].totalTankers += delivery.numberOfTankers;
            acc[buildingId].totalCost += deliveryCost;

            acc[buildingId].deliveries.push({
                date: delivery.date,
                timeOfDelivery: delivery.timeOfDelivery,
                numberOfTankers: delivery.numberOfTankers,
                invoiceNumber: delivery.invoiceNumber,
                tankerSize: delivery.tankerSize,
                price: delivery.price || 0,
                totalCost: deliveryCost,
            });

            return acc;
        }, {});

        const formattedReport = Object.values(report);
        const totalWeeklyTankers = formattedReport.reduce((sum, building) => sum + building.totalTankers, 0);
        const totalWeeklyCost = formattedReport.reduce((sum, building) => sum + building.totalCost, 0);

        res.status(200).json({ weeklyReport: formattedReport, totalWeeklyTankers, totalWeeklyCost });
    } catch (error) {
        console.error("Error fetching weekly report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get monthly report
exports.getMonthlyReport = async (req, res) => {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ message: "month and year are required" });
        }

        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
            return res.status(400).json({ message: "Invalid month or year" });
        }

        const date = new Date(yearNum, monthNum - 1);
        const startDate = startOfMonth(date);
        const endDate = endOfMonth(date);

        const startDateStr = format(startDate, 'yyyy-MM-dd');
        const endDateStr = format(endDate, 'yyyy-MM-dd');

        const deliveries = await Delivery.find({ date: { $gte: startDateStr, $lte: endDateStr } }).populate('buildingId');
        if (!deliveries.length) {
            return res.status(200).json([]);
        }

        const report = deliveries.reduce((acc, delivery) => {
            const buildingId = delivery.buildingId._id.toString();
            if (!acc[buildingId]) {
                acc[buildingId] = {
                    buildingId: delivery.buildingId._id,
                    buildingDetails: delivery.buildingId,
                    deliveries: [],
                    totalTankers: 0,
                    totalCost: 0,
                };
            }

            const deliveryCost = delivery.numberOfTankers * (delivery.price || 0);
            acc[buildingId].totalTankers += delivery.numberOfTankers;
            acc[buildingId].totalCost += deliveryCost;

            acc[buildingId].deliveries.push({
                date: delivery.date,
                timeOfDelivery: delivery.timeOfDelivery,
                numberOfTankers: delivery.numberOfTankers,
                invoiceNumber: delivery.invoiceNumber,
                tankerSize: delivery.tankerSize,
                price: delivery.price || 0,
                totalCost: deliveryCost,
            });

            return acc;
        }, {});

        const formattedReport = Object.values(report);
        const totalMonthlyTankers = formattedReport.reduce((sum, building) => sum + building.totalTankers, 0);
        const totalMonthlyCost = formattedReport.reduce((sum, building) => sum + building.totalCost, 0);

        
        res.status(200).json({ monthlyReport: formattedReport, totalMonthlyTankers, totalMonthlyCost });
    } catch (error) {
        console.error("Error fetching monthly report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
  

// Get yearly report
exports.getYearlyReport = async (req, res) => {
  try {
    const { year } = req.query;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const deliveries = await Delivery.find({
      date: { $gte: startDate, $lte: endDate },
    }).populate('buildingId');
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
