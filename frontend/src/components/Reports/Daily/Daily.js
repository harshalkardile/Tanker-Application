import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../api';
import DeliveryTable from '../DeliveryTable';
import PrintReportButton from '../PrintReportButton';
import './DailyReport.css';

const Daily  = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [deliveries, setDeliveries] = useState([]);
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);

    const fetchDeliveriesByDate = async (date) => {
        try {
            const response = await axios.get(`${API_URL}/deliveries/${date}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error('Failed to fetch deliveries:', error);
        }
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        fetchDeliveriesByDate(date);
    };

    const toggleExpand = (deliveryId) => {
        setExpandedDeliveryId(expandedDeliveryId === deliveryId ? null : deliveryId);
    };

    const calculateDailyTotals = () => {
        const totalTankers = deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);
        return { totalTankers, totalCost };
    };

    const handlePrintReport = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Daily Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 40px;
                        background-color: #fff;
                    }
                    .company-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .company-header h1 {
                        color: #2c3e50;
                        margin: 0;
                        font-size: 24px;
                    }
                    .report-container {
                        max-width: 1000px;
                        margin: auto;
                    }
                    .report-header {
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 15px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 12px;
                        font-size: 14px;
                        text-align: left;
                    }
                    th {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .total-section {
                        margin-top: 30px;
                        text-align: right;
                        font-size: 16px;
                        padding: 20px;
                        background: #f8f9fa;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="company-header">
                        <h1>Water Tank Supply Co.</h1>
                        <p>123 Water Street, Mumbai, India</p>
                    </div>
                    <div class="report-header">
                        <h2>Daily Report</h2>
                        <p>Date: ${selectedDate}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Society Name</th>
                                <th>Invoice Number</th>
                                <th>Time of Delivery</th>
                                <th>Number of Tankers</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${deliveries.map(delivery => `
                                <tr>
                                    <td>${delivery.buildingId.name}</td>
                                    <td>${delivery.invoiceNumber}</td>
                                    <td>${delivery.timeOfDelivery}</td>
                                    <td>${delivery.numberOfTankers}</td>
                                    <td>₹${delivery.totalCost}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total-section">
                        <p><strong>Total Tankers:</strong> ${calculateDailyTotals().totalTankers}</p>
                        <p><strong>Total Cost:</strong> ₹${calculateDailyTotals().totalCost}</p>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="form-container">
        <div className="form-card">
        {/* <div className="daily-report"> */}
            <h2>Daily Report</h2>
            <div className="date-picker">
                <label htmlFor="datePicker">Select Date </label>
                <input
                    type="date"
                    id="datePicker"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            
            {deliveries.length > 0 ? (
                <div>
                    <DeliveryTable
                        deliveries={deliveries}
                        toggleExpand={toggleExpand}
                        expandedDeliveryId={expandedDeliveryId}
                        reportType="daily"
                    />
                   
                    <PrintReportButton onPrint={handlePrintReport} />
                </div>
            ) : (
                <p>No deliveries found for the selected date.</p>
            )}
        </div>
        </div>
    );
};

export default Daily;