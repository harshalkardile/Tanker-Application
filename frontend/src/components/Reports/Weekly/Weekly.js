import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../api';
import './WeeklyReport.css';
import DeliveryTable from '../DeliveryTable';
import PrintReportButton from '../PrintReportButton';

const Weekly  = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [weeklyReport, setWeeklyReport] = useState(null);
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);

    const fetchWeeklyReport = async (start, end) => {
        try {
            const response = await axios.get(`${API_URL}/reports/weekly?startDate=${start}&endDate=${end}`);
            setWeeklyReport(response.data);
        } catch (error) {
            console.error('Failed to fetch weekly report:', error);
        }
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const toggleExpand = (deliveryId) => {
        setExpandedDeliveryId(expandedDeliveryId === deliveryId ? null : deliveryId);
    };

    const handlePrintReport = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Weekly Report</title>
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
                        <h2>Weekly Report</h2>
                        <p>Period: ${startDate} to ${endDate}</p>
                    </div>
                    <table>
                       <thead>
                            <tr>
                            
                                <th>Society Name</th>
                                <th>Invoice Numbers</th>
                                <th>Total Trips</th>
                                <th>Total Tankers</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${weeklyReport?.weeklyReport.map(report => `
                                <tr>
                                      
                                    <td>${report.buildingDetails.name}</td>
                                    <td>${report.deliveries.map(delivery => delivery.invoiceNumber).join(', ')}</td>
                                    <td>${report.deliveries.length}</td>
                                    <td>${report.totalTankers}</td>
                                    <td>₹${report.totalCost}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="total-section">
                        <p><strong>Total Weekly Tankers:</strong> ${weeklyReport?.totalWeeklyTankers}</p>
                        <p><strong>Total Weekly Cost:</strong> ₹${weeklyReport?.totalWeeklyCost}</p>
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
            <h2>Weekly Report</h2>
            <div className="date-picker">
            <div className='first-date'>
            <label htmlFor="datePicker">Start Date : </label>
                <input
                    type="date"
                    id="datePicker"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
            </div>
            <div className='first-date'>
            <label htmlFor="datePicker">End Date : </label>
                <input
                    type="date"
                    id="datePicker"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
               
            </div>
            </div>
            <button className="submit-button" onClick={() => fetchWeeklyReport(startDate, endDate)}>Generate Report</button>
            
            {weeklyReport && (
                <div>
                    <DeliveryTable
                        deliveries={weeklyReport.weeklyReport}
                        toggleExpand={toggleExpand}
                        expandedDeliveryId={expandedDeliveryId}
                        reportType="weekly"
                        weeklyReport={weeklyReport}
                    />
                   
                    <PrintReportButton onPrint={handlePrintReport} />
                </div>
            )}
        </div>
        </div>
        
    );
};

export default Weekly