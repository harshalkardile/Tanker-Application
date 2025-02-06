import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api';
import './Reports.css';
import ReportTypeSelector from './ReportTypeSelector';
import DatePicker from './DatePicker';
import DeliveryTable from './DeliveryTable';
import PrintReportButton from './PrintReportButton';

const Reports = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [deliveries, setDeliveries] = useState([]);
    const [weeklyReport, setWeeklyReport] = useState(null);
    const [monthlyReport, setMonthlyReport] = useState(null);
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
    const [reportType, setReportType] = useState('daily');

    // Fetch deliveries based on the selected date
    const fetchDeliveriesByDate = async (date) => {
        try {
            console.log(date);
            const response = await axios.get(`${API_URL}/deliveries/${date}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error('Failed to fetch deliveries:', error);
        }
    };

    // Fetch weekly report
    const fetchWeeklyReport = async (startDate, endDate) => {
        try {
            const response = await axios.get(`${API_URL}/reports/weekly?startDate=${startDate}&endDate=${endDate}`);
            setWeeklyReport(response.data);
        } catch (error) {
            console.error('Failed to fetch weekly report:', error);
        }
    };

    // Fetch monthly report
    const fetchMonthlyReport = async (month, year) => {
        try {
            console.log(month, year);
            const response = await axios.get(`${API_URL}/reports/monthly?month=${month}&year=${year}`);
            setMonthlyReport(response.data);
        } catch (error) {
            console.error('Failed to fetch monthly report:', error);
        }
    };

    // Handle date change for daily report
    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        if (reportType === 'daily') {
            fetchDeliveriesByDate(date);
        }
    };

    // Handle start date change for weekly report
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    // Handle end date change for weekly report
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    // Handle month change for monthly report
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };


    // Handle year change for monthly report
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // Handle report type change
    const handleReportTypeChange = (type) => {
        setReportType(type);
        setWeeklyReport(null);
        setMonthlyReport(null);
        setDeliveries([]);
    };

    // Toggle expand/collapse for a delivery item
    const toggleExpand = (deliveryId) => {
        setExpandedDeliveryId(expandedDeliveryId === deliveryId ? null : deliveryId);
    };

    // Calculate total cost and total tankers for daily data
    const calculateDailyTotals = () => {
        const totalTankers = deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);
        return { totalTankers, totalCost };
    };

    // Print the entire report
    const handlePrintReport = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</title>
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
                        <p>Contact: +91 123-456-7890</p>
                    </div>
                    <div class="report-header">
                        <h2>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                    ${reportType === 'daily' ? `
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
                    ` : reportType === 'weekly' ? `
                        <table>
                            <thead>
                                <tr>
                                    <th>Society Name</th>
                                    <th>Number of Tankers</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${weeklyReport.weeklyReport.map(report => `
                                    <tr>
                                        <td>${report.buildingDetails.name}</td>
                                        <td>${report.totalTankers}</td>
                                        <td>₹${report.totalCost}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="total-section">
                            <p><strong>Total Weekly Tankers:</strong> ${weeklyReport.totalWeeklyTankers}</p>
                            <p><strong>Total Weekly Cost:</strong> ₹${weeklyReport.totalWeeklyCost}</p>
                        </div>
                    ` : `
                        <table>
                            <thead>
                                <tr>
                                    <th>Society Name</th>
                                    <th>Number of Tankers</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${console.log(monthlyReport)}
                              <tbody>
                                ${monthlyReport.monthlyReport.map(report => `
                                    <tr>
                                        <td>${report.buildingDetails.name}</td>
                                        <td>${report.totalTankers}</td>
                                        <td>₹${report.totalCost}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="total-section">
                            <p><strong>Total Monthly Tankers:</strong> ${monthlyReport.totalMonthlyTankers}</p>
                            <p><strong>Total Monthly Cost:</strong> ₹${monthlyReport.totalMonthlyCost}</p>
                        </div>
                    `}
                    <div class="footer">
                        <p>Thank you for your business!</p>
                        <p>For any queries, please contact: support@watertanksupply.com</p>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="reports-container">
            <h2>Deliveries Report</h2>
            <ReportTypeSelector onReportTypeChange={handleReportTypeChange} />
            {reportType === "daily" && (
                <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
            )}
            {reportType === "weekly" && (
                <div className="weekly-report">
                    <h3>Weekly Report</h3>
                    <div>
                        <label>Start Date: </label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                    </div>
                    <div>
                        <label>End Date: </label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </div>
                    <button onClick={() => fetchWeeklyReport(startDate, endDate)}>Fetch Weekly Report</button>
                    {weeklyReport && (
                        <div>
                            <DeliveryTable
                                deliveries={weeklyReport.weeklyReport}
                                toggleExpand={toggleExpand}
                                expandedDeliveryId={expandedDeliveryId}
                                reportType={reportType}
                                weeklyReport={weeklyReport} // Pass weeklyReport prop
                            />
                            
                            <PrintReportButton onPrint={handlePrintReport} />
                        </div>
                    )}
                </div>
            )}
            {reportType === "monthly" && (
                <div className="monthly-report">
                    <h3>Monthly Report</h3>
                    <div>
                        <div>
                            <label>Month: </label>
                            <select value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">Select Month</option>
                                {[
                                    "January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ].map((month, index) => (
                                    <option key={index} value={index + 1}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label>Year: </label>
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
                    <button onClick={() => fetchMonthlyReport(selectedMonth, selectedYear)}>Fetch Monthly Report</button>
                    {monthlyReport && (
                        <div>
                            <DeliveryTable
                                deliveries={monthlyReport.monthlyReport}
                                toggleExpand={toggleExpand}
                                expandedDeliveryId={expandedDeliveryId}
                                reportType={reportType}
                                monthlyReport={monthlyReport} // Pass monthlyReport prop
                            />
                         
                            <PrintReportButton onPrint={handlePrintReport} />
                        </div>
                    )}
                </div>
            )}
            {reportType === "daily" && deliveries.length > 0 && (
                <div>
                    <DeliveryTable
                        deliveries={deliveries}
                        toggleExpand={toggleExpand}
                        expandedDeliveryId={expandedDeliveryId}
                        reportType={reportType}
                    />
                   
                    <PrintReportButton onPrint={handlePrintReport} />
                </div>
            )}
            {reportType === "daily" && deliveries.length === 0 && (
                <p>No deliveries found for the selected date.</p>
            )}
        </div>
    );
};

export default Reports;

// const Reports = () => {
//     const [selectedDate, setSelectedDate] = useState('');
//     const [deliveries, setDeliveries] = useState([]);
//     const [weeklyReport, setWeeklyReport] = useState(null);
//     const [monthlyReport, setMonthlyReport] = useState(null);
//     const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
//     const [reportType, setReportType] = useState('daily'); // 'daily', 'weekly', or 'monthly'

//     // Fetch deliveries based on the selected date
//     const fetchDeliveriesByDate = async (date) => {
//         try {
//             const response = await axios.get(`${API_URL}/deliveries/${date}`);
//             setDeliveries(response.data);
//         } catch (error) {
//             console.error('Failed to fetch deliveries:', error);
//         }
//     };

//     // Fetch weekly report
//     const fetchWeeklyReport = async (startDate, endDate) => {
//         try {
//             const response = await axios.get(`${API_URL}/reports/weekly?startDate=${startDate}&endDate=${endDate}`);
//             setWeeklyReport(response.data);
//         } catch (error) {
//             console.error('Failed to fetch weekly report:', error);
//         }
//     };

//     // Fetch monthly report
//     const fetchMonthlyReport = async (month, year) => {
//         try {
//             const response = await axios.get(`${API_URL}/reports/monthly?month=${month}&year=${year}`);
//             setMonthlyReport(response.data);
//         } catch (error) {
//             console.error('Failed to fetch monthly report:', error);
//         }
//     };

//     // Handle date change from the date picker
//     const handleDateChange = (e) => {
//         const date = e.target.value;
//         setSelectedDate(date);
//         if (reportType === 'daily') {
//             fetchDeliveriesByDate(date);
//         }
//     };

//     // Handle report type change
//     const handleReportTypeChange = (type) => {
//         setReportType(type);
//         setWeeklyReport(null);
//         setMonthlyReport(null);
//         setDeliveries([]);
//     };

//     // Toggle expand/collapse for a delivery item
//     const toggleExpand = (deliveryId) => {
//         setExpandedDeliveryId(expandedDeliveryId === deliveryId ? null : deliveryId);
//     };

//     // Calculate total cost and total tankers for daily data
//     const calculateDailyTotals = () => {
//         const totalTankers = deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
//         const totalCost = deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);
//         return { totalTankers, totalCost };
//     };

//     // Print the entire report
//     const handlePrintReport = () => {
//         const printWindow = window.open('', '_blank');
//         printWindow.document.write(`
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <title>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</title>
//                 <style>
//                     body {
//                         font-family: Arial, sans-serif;
//                         margin: 0;
//                         padding: 40px;
//                         background-color: #fff;
//                     }
//                     .company-header {
//                         text-align: center;
//                         margin-bottom: 30px;
//                     }
//                     .company-header h1 {
//                         color: #2c3e50;
//                         margin: 0;
//                         font-size: 24px;
//                     }
//                     .report-container {
//                         max-width: 1000px;
//                         margin: auto;
//                     }
//                     .report-header {
//                         margin-bottom: 30px;
//                         border-bottom: 2px solid #333;
//                         padding-bottom: 15px;
//                     }
//                     table {
//                         width: 100%;
//                         border-collapse: collapse;
//                         margin: 20px 0;
//                     }
//                     th, td {
//                         border: 1px solid #ddd;
//                         padding: 12px;
//                         font-size: 14px;
//                         text-align: left;
//                     }
//                     th {
//                         background-color: #f8f9fa;
//                         font-weight: bold;
//                         font-size: 14px;
//                     }
//                     .total-section {
//                         margin-top: 30px;
//                         text-align: right;
//                         font-size: 16px;
//                         padding: 20px;
//                         background: #f8f9fa;
//                     }
//                     .footer {
//                         margin-top: 50px;
//                         text-align: center;
//                         color: #666;
//                         border-top: 1px solid #ddd;
//                         padding-top: 20px;
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="report-container">
//                     <div class="company-header">
//                         <h1>Water Tank Supply Co.</h1>
//                         <p>123 Water Street, Mumbai, India</p>
//                         <p>Contact: +91 123-456-7890</p>
//                     </div>
//                     <div class="report-header">
//                         <h2>${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h2>
//                         <p>Date: ${new Date().toLocaleDateString()}</p>
//                     </div>
//                     ${reportType === 'daily' ? `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Society Name</th>
//                                     <th>Invoice Number</th>
//                                     <th>Time of Delivery</th>
                                 
//                                     <th>Number of Tankers</th>
//                                     <th>Total Cost</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${deliveries.map(delivery => `
//                                     <tr>
//                                         <td>${delivery.buildingId.name}</td>
//                                         <td>${delivery.invoiceNumber}</td>
//                                         <td>${delivery.timeOfDelivery}</td>
                                     
//                                         <td>${delivery.numberOfTankers}</td>
//                                         <td>₹${delivery.totalCost}</td>
//                                     </tr>
//                                 `).join('')}
//                             </tbody>
//                         </table>
//                         <div class="total-section">
//                             <p><strong>Total Tankers:</strong> ${calculateDailyTotals().totalTankers}</p>
//                             <p><strong>Total Cost:</strong> ₹${calculateDailyTotals().totalCost}</p>
//                         </div>
//                     ` : reportType === 'weekly' ? `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Society Name</th>
//                                     <th>Total Tankers</th>
//                                     <th>Total Cost</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${weeklyReport.weeklyReport.map(report => `
//                                     <tr>
//                                         <td>${report.buildingDetails.name}</td>
//                                         <td>${report.totalTankers}</td>
//                                         <td>₹${report.totalCost}</td>
//                                     </tr>
//                                 `).join('')}
//                             </tbody>
//                         </table>
//                         <div class="total-section">
//                             <p><strong>Total Weekly Tankers:</strong> ${weeklyReport.totalWeeklyTankers}</p>
//                             <p><strong>Total Weekly Cost:</strong> ₹${weeklyReport.totalWeeklyCost}</p>
//                         </div>
//                     ` : `
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Society Name</th>
//                                     <th>Total Tankers</th>
//                                     <th>Total Cost</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 ${monthlyReport.monthlyReport.map(report => `
//                                     <tr>
//                                         <td>${report.buildingDetails.name}</td>
//                                         <td>${report.totalTankers}</td>
//                                         <td>₹${report.totalCost}</td>
//                                     </tr>
//                                 `).join('')}
//                             </tbody>
//                         </table>
//                         <div class="total-section">
//                             <p><strong>Total Monthly Tankers:</strong> ${monthlyReport.totalMonthlyTankers}</p>
//                             <p><strong>Total Monthly Cost:</strong> ₹${monthlyReport.totalMonthlyCost}</p>
//                         </div>
//                     `}
//                     <div class="footer">
//                         <p>Thank you for your business!</p>
//                         <p>For any queries, please contact: support@watertanksupply.com</p>
//                     </div>
//                 </div>
//             </body>
//             </html>
//         `);
//         printWindow.document.close();
//         printWindow.print();
//     };

//     return (
//         <div className="reports-container">
//             <h2>Deliveries Report</h2>
//             <div className="report-type-selector">
//                 <button onClick={() => handleReportTypeChange('daily')}>Daily</button>
//                 <button onClick={() => handleReportTypeChange('weekly')}>Weekly</button>
//                 <button onClick={() => handleReportTypeChange('monthly')}>Monthly</button>
//             </div>
//             {reportType === 'daily' && (
//                 <div className="date-picker">
//                     <label htmlFor="datePicker">Select Date: </label>
//                     <input
//                         type="date"
//                         id="datePicker"
//                         value={selectedDate}
//                         onChange={handleDateChange}
//                     />
//                 </div>
//             )}
//             {reportType === 'weekly' && (
//                 <div className="weekly-report">
//                     <h3>Weekly Report</h3>
//                     <button onClick={() => fetchWeeklyReport('2025-01-29', '2025-02-04')}>Fetch Weekly Report</button>
//                     {weeklyReport && (
//                         <div>
//                             <table className="deliveries-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Society Name</th>
//                                         <th>Total Tankers</th>
//                                         <th>Total Cost</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {weeklyReport.weeklyReport.map((report) => (
//                                         <React.Fragment key={report.buildingId}>
//                                             <tr onClick={() => toggleExpand(report.buildingId)} className="delivery-row">
//                                                 <td>{report.buildingDetails.name}</td>
//                                                 <td>{report.totalTankers}</td>
//                                                 <td>{report.totalCost}</td>
//                                             </tr>
//                                             {expandedDeliveryId === report.buildingId && (
//                                                 <tr className="details-row">
//                                                     <td colSpan="3">
//                                                         <div className="details">
//                                                             <p><strong>Address:</strong> {report.buildingDetails.address}</p>
//                                                             <p><strong>Deliveries:</strong></p>
//                                                             <ul>
//                                                                 {report.deliveries.map((delivery) => (
//                                                                     <li key={delivery.invoiceNumber}>
//                                                                         <p><strong>Date:</strong> {delivery.date}</p>
//                                                                         <p><strong>Time of Delivery:</strong> {delivery.timeOfDelivery}</p>
//                                                                         <p><strong>Invoice Number:</strong> {delivery.invoiceNumber}</p>
//                                                                         <p><strong>Number of Tankers:</strong> {delivery.numberOfTankers}</p>
//                                                                         <p><strong>Total Cost:</strong> {delivery.totalCost}</p>
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div className="total">
//                                 <p><strong>Total Weekly Tankers:</strong> {weeklyReport.totalWeeklyTankers}</p>
//                                 <p><strong>Total Weekly Cost:</strong> {weeklyReport.totalWeeklyCost}</p>
//                             </div>
//                             <button onClick={handlePrintReport}>Print Report</button>
//                         </div>
//                     )}
//                 </div>
//             )}
//             {reportType === 'monthly' && (
//                 <div className="monthly-report">
//                     <h3>Monthly Report</h3>
//                     <button onClick={() => fetchMonthlyReport(2, 2025)}>Fetch Monthly Report</button>
//                     {monthlyReport && (
//                         <div>
//                             <table className="deliveries-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Society Name</th>
//                                         <th>Total Tankers</th>
//                                         <th>Total Cost</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {monthlyReport.monthlyReport.map((report) => (
//                                         <React.Fragment key={report.buildingId}>
//                                             <tr onClick={() => toggleExpand(report.buildingId)} className="delivery-row">
//                                                 <td>{report.buildingDetails.name}</td>
//                                                 <td>{report.totalTankers}</td>
//                                                 <td>{report.totalCost}</td>
//                                             </tr>
//                                             {expandedDeliveryId === report.buildingId && (
//                                                 <tr className="details-row">
//                                                     <td colSpan="3">
//                                                         <div className="details">
//                                                             <p><strong>Address:</strong> {report.buildingDetails.address}</p>
//                                                             <p><strong>Deliveries:</strong></p>
//                                                             <ul>
//                                                                 {report.deliveries.map((delivery) => (
//                                                                     <li key={delivery.invoiceNumber}>
//                                                                         <p><strong>Date:</strong> {delivery.date}</p>
//                                                                         <p><strong>Time of Delivery:</strong> {delivery.timeOfDelivery}</p>
//                                                                         <p><strong>Invoice Number:</strong> {delivery.invoiceNumber}</p>
//                                                                         <p><strong>Number of Tankers:</strong> {delivery.numberOfTankers}</p>
//                                                                         <p><strong>Total Cost:</strong> {delivery.totalCost}</p>
//                                                                     </li>
//                                                                 ))}
//                                                             </ul>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div className="total">
//                                 <p><strong>Total Monthly Tankers:</strong> {monthlyReport.totalMonthlyTankers}</p>
//                                 <p><strong>Total Monthly Cost:</strong> {monthlyReport.totalMonthlyCost}</p>
//                             </div>
//                             <button onClick={handlePrintReport}>Print Report</button>
//                         </div>
//                     )}
//                 </div>
//             )}
//             {reportType === 'daily' && (
//                 <div>
//                     {deliveries.length > 0 ? (
//                         <div>
//                             <table className="deliveries-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Society Name</th>
//                                         <th>Invoice Number</th>
//                                         <th>Time of Delivery</th>
//                                         <th>Charge per Tanker</th>
//                                         <th>Number of Tankers</th>
//                                         <th>Total Cost</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {deliveries.map((delivery) => (
//                                         <React.Fragment key={delivery._id}>
//                                             <tr onClick={() => toggleExpand(delivery._id)} className="delivery-row">
//                                                 <td>{delivery.buildingId.name}</td>
//                                                 <td>{delivery.invoiceNumber}</td>
//                                                 <td>{delivery.timeOfDelivery}</td>
//                                                 <td>${(delivery.totalCost / delivery.numberOfTankers).toFixed(2)}</td>
//                                                 <td>{delivery.numberOfTankers}</td>
//                                                 <td>${delivery.totalCost}</td>
//                                             </tr>
//                                             {expandedDeliveryId === delivery._id && (
//                                                 <tr className="details-row">
//                                                     <td colSpan="6">
//                                                         <div className="details">
//                                                             <p><strong>Address:</strong> {delivery.buildingId.address}</p>
//                                                             <p><strong>Date:</strong> {delivery.date}</p>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div className="total">
//                                 <p><strong>Total Tankers:</strong> {calculateDailyTotals().totalTankers}</p>
//                                 <p><strong>Total Cost:</strong> ${calculateDailyTotals().totalCost}</p>
//                             </div>
//                             <button onClick={handlePrintReport}>Print Report</button>
//                         </div>
//                     ) : (
//                         <p>No deliveries found for the selected date.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };