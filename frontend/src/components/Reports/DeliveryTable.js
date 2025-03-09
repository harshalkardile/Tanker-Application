import React, { useState } from 'react';
import './DeliveryTable.css';

const DeliveryTable = ({ deliveries, toggleExpand, expandedDeliveryId, reportType, weeklyReport, monthlyReport }) => {
    const [invoiceIdCounter, setInvoiceIdCounter] = useState(1005); // Initial invoice ID

    const calculateTotals = (data) => {
        const totalTankers = data.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = data.reduce((sum, delivery) => sum + delivery.totalCost, 0);
        return { totalTankers, totalCost };
    };

    const handlePrintReport = (report) => {
        const totalTankers = report.deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = report.deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);

        const reportDate = new Date(report.date);
        const monthName = reportDate.toLocaleString('default', { month: 'long' });
        const year = reportDate.getFullYear();

        // Increment Invoice ID
        setInvoiceIdCounter(prev => prev + 1);

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Report</title>
              
                <style>
                    @page {
                        size: A4;
                        margin: 15mm; /* Adjusted margin for more space */
                    }
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f6f9;
                        font-size: 12px;
                    }
                    .invoice-container {
                        width: 100%;
                        max-width: 700px; /* Further reduced max-width for better fitting */
                        margin: 0 auto;
                        padding: 20px;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .invoice-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #ddd;
                        padding-bottom: 8px;
                    }
                    .invoice-header h1 {
                        font-size: 20px; /* Increased header font size */
                        color: #333;
                        margin: 0;
                        text-transform: uppercase;
                        font-weight: bold;
                    }
                    .invoice-header .invoice-id {
                        font-size: 14px;
                        font-weight: bold;
                        color: #000;
                    }
                    .invoice-header p {
                        font-size: 12px;
                        color: #777;
                        margin: 5px 0;
                    }
                    .invoice-header .date {
                        font-size: 12px;
                        color: #777;
                        text-align: right;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 15px;
                        font-size: 10px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 6px;
                        text-align: left;
                    }
                    th {
                        font-size: 14px; /* Increased font size for table headers */
                        background-color: #f7f7f7;
                        font-weight: bold;
                        color: #333;
                    }
                    td {
                        font-size: 12px; /* Increased font size for table data */
                        background-color: #fafafa;
                    }
                    .total-info {
                        text-align: right;
                        font-size: 13px; /* Increased font size for total text */
                        font-weight: bold;
                        color: #333;
                        margin-top: 15px;
                        border-top: 2px solid #ddd;
                        padding-top: 10px;
                    }
                    .bank-details {
                        font-size: 10px;
                        margin-top: 20px;
                        padding-top: 15px;
                        border-top: 1px solid #ddd;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                    }
                    .bank-details div {
                        display: flex;
                        flex-direction: column;
                    }
                    .bank-details div p {
                        margin: 3px 0;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <!-- Invoice Header -->
                    <div class="invoice-header">
                        <div>
                            <h1>Report</h1>
                            <p><strong>Building Name:</strong> ${report.buildingDetails.name}</p>
                            <p><strong>Month/Year:</strong> ${monthName} ${year}</p>
                        </div>
                        <div>
                            <p class="invoice-id">Invoice ID: ${invoiceIdCounter}</p> <!-- Invoice ID on top right -->
                        </div>
                    </div>

                    <!-- Invoice Table -->
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time of Delivery</th>
                                <th>Invoice Number</th>
                                <th>Number of Tankers</th>
                                <th>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${report.deliveries.map((delivery) => `
                                <tr>
                                    <td>${new Date(delivery.date).toLocaleDateString()}</td>
                                    <td>${delivery.timeOfDelivery}</td>
                                    <td>${delivery.invoiceNumber}</td>
                                    <td>${delivery.numberOfTankers}</td>
                                    <td>₹${delivery.totalCost}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <!-- Total Information -->
                    <div class="total-info">
                        <p><strong>Total Number of Tankers for the Month:</strong> ${totalTankers}</p>
                        <p><strong>Total Cost for the Month:</strong> ₹${totalCost}</p>
                    </div>

                    <!-- Bank Details -->
                    <div class="bank-details">
                        <div>
                            <p><strong>Bank Name:</strong> XYZ Bank</p>
                            <p><strong>Account Number:</strong> 1234567890</p>
                        </div>
                        <div>
                            <p><strong>IFSC Code:</strong> XYZ12345</p>
                            <p><strong>Branch:</strong> City Branch</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="table-wrapper">
            {/* Daily Report */}
            {reportType === 'daily' && (
                <div>
                    {deliveries.length > 0 ? (
                        <div>
                            <table className="deliveries-table">
                                <thead>
                                    <tr>
                                        <th>Society Name</th>
                                        <th>Invoice Number</th>
                                        <th>Time of Delivery</th>
                                        <th>Charge per Tanker</th>
                                        <th>Number of Tankers</th>
                                        <th>Total Cost</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveries.map((delivery) => (
                                        <React.Fragment key={delivery._id}>
                                            <tr 
                                                className="delivery-row"
                                                onClick={() => toggleExpand(delivery._id)}
                                                aria-expanded={expandedDeliveryId === delivery._id}
                                            >
                                                <td>{delivery.buildingId.name}</td>
                                                <td>{delivery.invoiceNumber}</td>
                                                <td>{delivery.timeOfDelivery}</td>
                                                <td>₹{(delivery.totalCost / delivery.numberOfTankers).toFixed(2)}</td>
                                                <td>{delivery.numberOfTankers}</td>
                                                <td>₹{delivery.totalCost}</td>
                                            </tr>
                                            {expandedDeliveryId === delivery._id && (
                                                <tr className="details-row">
                                                    <td colSpan="7">
                                                        <div className="details">
                                                            <p><strong>Address:</strong> {delivery.buildingId.address}</p>
                                                            <p><strong>Date:</strong> {delivery.date}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                            <div className="total">
                                <p><strong>Total Tankers:</strong> {calculateTotals(deliveries).totalTankers}</p>
                                <p><strong>Total Cost:</strong> ₹{calculateTotals(deliveries).totalCost}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="table-empty">
                            <p>No deliveries found for the selected date.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Weekly Report */}
            {reportType === 'weekly' && weeklyReport && (
                <div>
                    <table className="deliveries-table">
                        <thead>
                            <tr>
                                <th>Society Name</th>
                                <th>Total Tankers</th>
                                <th>Total Cost</th>
                                <th>Action</th> {/* Add Action column */}
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyReport.weeklyReport.map((report) => (
                                <React.Fragment key={report.buildingId}>
                                    <tr 
                                        className="delivery-row"
                                        onClick={() => toggleExpand(report.buildingId)}
                                        aria-expanded={expandedDeliveryId === report.buildingId}
                                    >
                                        <td>{report.buildingDetails.name}</td>
                                        <td>{report.totalTankers}</td>
                                        <td>₹{report.totalCost}</td>
                                        <td>
                                            <button onClick={() => handlePrintReport(report)}>Print</button> {/* Print Button */}
                                        </td>
                                    </tr>
                                    {expandedDeliveryId === report.buildingId && (
                                        <tr className="details-row">
                                            <td colSpan="4">
                                                <div className="details">
                                                    <p><strong>Address:</strong> {report.buildingDetails.address}</p>
                                                    <p><strong>Deliveries:</strong></p>
                                                    <ul>
                                                        {report.deliveries.map((delivery) => (
                                                            <li key={delivery.invoiceNumber}>
                                                                <p><strong>Date:</strong> {delivery.date}</p>
                                                                <p><strong>Time of Delivery:</strong> {delivery.timeOfDelivery}</p>
                                                                <p><strong>Invoice Number:</strong> {delivery.invoiceNumber}</p>
                                                                <p><strong>Number of Tankers:</strong> {delivery.numberOfTankers}</p>
                                                                <p><strong>Total Cost:</strong> ₹{delivery.totalCost}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <div className="total">
                        <p><strong>Total Weekly Tankers:</strong> {weeklyReport.totalWeeklyTankers}</p>
                        <p><strong>Total Weekly Cost:</strong> ₹{weeklyReport.totalWeeklyCost}</p>
                    </div>
                </div>
            )}

            {/* Monthly Report */}
            {reportType === 'monthly' && monthlyReport && (
                <div>
                    <table className="deliveries-table">
                        <thead>
                            <tr>
                                <th>Society Name</th>
                                <th>Total Tankers</th>
                                <th>Total Cost</th>
                                <th>Action</th> {/* Add Action column */}
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyReport.monthlyReport.map((report) => (
                                <React.Fragment key={report.buildingId}>
                                    <tr 
                                        className="delivery-row"
                                        onClick={() => toggleExpand(report.buildingId)}
                                        aria-expanded={expandedDeliveryId === report.buildingId}
                                    >
                                        <td>{report.buildingDetails.name}</td>
                                        <td>{report.totalTankers}</td>
                                        <td>₹{report.totalCost}</td>
                                        <td>
                                            <button onClick={() => handlePrintReport(report)}>Print</button> {/* Print Button */}
                                        </td>
                                    </tr>
                                    {expandedDeliveryId === report.buildingId && (
                                        <tr className="details-row">
                                            <td colSpan="4">
                                                <div className="details">
                                                    <p><strong>Address:</strong> {report.buildingDetails.address}</p>
                                                    <p><strong>Deliveries:</strong></p>
                                                    <ul>
                                                        {report.deliveries.map((delivery) => (
                                                            <li key={delivery.invoiceNumber}>
                                                                <p><strong>Date:</strong> {delivery.date}</p>
                                                                <p><strong>Time of Delivery:</strong> {delivery.timeOfDelivery}</p>
                                                                <p><strong>Invoice Number:</strong> {delivery.invoiceNumber}</p>
                                                                <p><strong>Number of Tankers:</strong> {delivery.numberOfTankers}</p>
                                                                <p><strong>Total Cost:</strong> ₹{delivery.totalCost}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <div className="total">
                        <p><strong>Total Monthly Tankers:</strong> {monthlyReport.totalMonthlyTankers}</p>
                        <p><strong>Total Monthly Cost:</strong> ₹{monthlyReport.totalMonthlyCost}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryTable;
