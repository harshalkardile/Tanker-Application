import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../api';
// import './Reports.css';
import DeliveryTable from '../DeliveryTable';
import PrintReportButton from '../PrintReportButton';
import './MonthlyReport.css';

const Monthly = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [monthlyReport, setMonthlyReport] = useState(null);
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [validationError, setValidationError] = useState('');

    const fetchMonthlyReport = async (month, year) => {
        try {
            const response = await axios.get(`${API_URL}/reports/monthly?month=${month}&year=${year}`);
            if (response.data && response.data.monthlyReport && response.data.monthlyReport.length > 0) {
                setMonthlyReport(response.data);
                setErrorMessage(''); // Clear error message if data is found
            } else {
                setMonthlyReport(null);
                setErrorMessage('No data available for the selected month and year.');
            }
        } catch (error) {
            console.error('Failed to fetch monthly report:', error);
            setMonthlyReport(null);
            setErrorMessage('Failed to fetch report. Please try again later.');
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setValidationError(''); // Clear validation error on change
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setValidationError(''); // Clear validation error on change
    };

    const toggleExpand = (deliveryId) => {
        setExpandedDeliveryId(expandedDeliveryId === deliveryId ? null : deliveryId);
    };

    const handlePrintReport = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Monthly Report</title>
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
                        <h1>Shree Yogiraj Water Suppliers</h1>
                        <p>Tathwade, Pune: 411033</p>
                    </div>
                    <div class="report-header">
                        <h2>Monthly Report</h2>
                        <p>Month: ${selectedMonth}/${selectedYear}</p>
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
                            ${monthlyReport?.monthlyReport?.map((report) => 
                               `<tr>
                                    <td>${report.buildingDetails.name}</td>
                                    <td>${report.deliveries.map(delivery => delivery.invoiceNumber).join(', ')}</td>
                                    <td>${report.deliveries.length}</td>
                                    <td>${report.totalTankers}</td>
                                    <td>₹${report.totalCost}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>
                    <div class="total-section">
                        <p><strong>Total Monthly Tankers:</strong> ${monthlyReport?.totalMonthlyTankers}</p>
                        <p><strong>Total Monthly Cost:</strong> ₹${monthlyReport?.totalMonthlyCost}</p>
                    </div>
                </div>
            </body>
            </html>`
        );
        printWindow.document.close();
        printWindow.print();
    };

    const handleGenerateReport = () => {
        if (!selectedMonth || !selectedYear) {
            setValidationError('Please select both Month and Year.');
            return;
        }

        fetchMonthlyReport(selectedMonth, selectedYear);
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2>Monthly Report</h2>
                <div className="date-picker">
                    <div className="first-date">
                        <label htmlFor="datePicker">Preferred Month: </label>
                        <select value={selectedMonth} onChange={handleMonthChange}>
                            <option value="">Select Month</option>
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                <option key={index} value={index + 1}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="datePicker">Preferred Year: </label>
                        <select value={selectedYear} onChange={handleYearChange}>
                            <option value="">Select Year</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="submit-button" onClick={handleGenerateReport}>Generate Report</button>

                {validationError && <div className="error-message">{validationError}</div>}

                {errorMessage && !validationError && <div className="error-message">{errorMessage}</div>}

                {monthlyReport && !errorMessage && (
                    <div>
                        <DeliveryTable
                            deliveries={monthlyReport?.monthlyReport}
                            toggleExpand={toggleExpand}
                            expandedDeliveryId={expandedDeliveryId}
                            reportType="monthly"
                            monthlyReport={monthlyReport}
                        />
                        <PrintReportButton onPrint={handlePrintReport} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Monthly;