import React, { useState, useEffect } from 'react';
import {Printer} from 'lucide-react';
import './DeliveryTable.css';
import Maharaj from '../Default-component/dnyaneshwarmaharaj.png';

const DeliveryTable = ({ deliveries, toggleExpand, expandedDeliveryId, reportType, weeklyReport, monthlyReport }) => {
    const [invoiceIdCounter, setInvoiceIdCounter] = useState(1005); // Initial invoice ID

    // Ensure the invoice ID is persistent across sessions
    useEffect(() => {
        const lastInvoiceId = localStorage.getItem('lastInvoiceId');
        if (lastInvoiceId) {
            setInvoiceIdCounter(Number(lastInvoiceId));
        }
    }, []);

    const calculateTotals = (data) => {
        const totalTankers = data.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = data.reduce((sum, delivery) => sum + delivery.totalCost, 0);
        return { totalTankers, totalCost };
    };
    const handlePrintReport = (report) => {
        const totalTankers = report.deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = report.deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);
    
        const reportDate = new Date(report.date);
    
        // Get today's date for issue date
        const today = new Date();
        const issueDate = today.toLocaleDateString();
    
        // Increment Invoice ID using state update
        setInvoiceIdCounter(prev => {
            const newInvoiceId = prev + 1;
            localStorage.setItem('lastInvoiceId', newInvoiceId);  // Save to localStorage (or sessionStorage) to persist the ID across sessions
            return newInvoiceId;
        });
    
        // Create an image element and load the image URL
        const imgUrl = Maharaj;
        const img = new Image();
        img.src = imgUrl;
    
        img.onload = () => {
            // Once the image is loaded, create the print window
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${reportType === 'monthly' ? 'Monthly Report' : 'Weekly Report'}</title>
                    <style>
                        @page {
                            size: A4;
                            margin: 15mm;
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
                            max-width: 700px;
                            margin: 0 auto;
                            padding: 20px;
                            background: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .logo-title {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 10px;
                            gap: 50px;  
                            border-bottom: 2px solid #ddd;
                        }
                        .logo-title img {
                            display: flex;
                            align-items: baseline;
                            justify-content: left;
                            margin-top: 10px;
                            padding-right: 100px;
                            height: 80px;
                            width: auto;
                        }
                        .company-name {
                            font-family: 'Brush Script MT', cursive;
                            text-align: left;
                            font-size: 24px;
                            font-weight: bold;
                            color: #333;
                            margin-left: -50px;
                            margin-bottom: 2px;
                        }
                        .company-address {
                            text-align: center;
                            font-family: 'Brush Script MT', cursive;
                            margin-right: 20px;
                            font-size: 12px;
                            color: #555;
                            margin-left: -50px;
                            margin-top: -10px;
                            margin-bottom: 10px;
                        }
                        .report-title {
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                            margin-bottom: 20px;
                            text-transform: uppercase;
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
                            font-size: 20px;
                            color: #333;
                            margin: 0;
                            text-transform: uppercase;
                            font-weight: bold;
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
                            table-layout: fixed;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 6px;
                            text-align: left;
                            word-wrap: break-word;
                        }
                        th {
                            font-size: 14px;
                            background-color: #f7f7f7;
                            font-weight: bold;
                            color: #333;
                        }
                        td {
                            font-size: 12px;
                            background-color: #fafafa;
                        }
                        .invoice-number-cell {
                            line-height: 1.5;
                        }
                        .total-info {
                            text-align: right;
                            font-size: 13px;
                            font-weight: bold;
                            color: #333;
                            margin-top: 15px;
                            margin-right: 20px;
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
                        <!-- Company Logo and Name -->
                        <div class="logo-title">
                            <img src="${imgUrl}" alt="Dnyaneshwar Maharaj" />
                            <div class="company-details">
                                <div class="company-name">
                                    <p>Shree Yogiraj Water Supplier</p>
                                </div>
                                <div class="company-address">
                                    <p>Sr. No. - 140/1 Tathawade Dist Pune - 411033<br> Ph. 9822500095/8055859500</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
        
                        <!-- Report Type (Monthly/Weekly) 
                         <!-- <div class="report-title">
                             <p>${reportType === 'monthly' ? 'Monthly Report' : 'Weekly Report'}</p>
                         </div>-->
        
                        <!-- Invoice Header -->
                        <div class="invoice-header">
                            <div>
                                <p><strong>Building Name:</strong> ${report.buildingDetails.name}</p>
                            </div>
                            <div>
                                <p class="invoice-id">Invoice ID: ${invoiceIdCounter}</p>
                                <p><strong>Issue Date:</strong> ${new Date(issueDate).toLocaleDateString('en-IN')}</p>
                            </div>
                        </div>
        
                        <!-- Delivery Table -->
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 10%">Sr. No.</th>
                                    <th style="width: 60%">Invoice Number</th>
                                    <th style="width: 15%">Number of Tankers</th>
                                    <th style="width: 15% ">Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${report.deliveries.map((delivery, index) => {
                                    // Format invoice numbers for display
                                    let invoiceCell = '';
                                    
                                    // Check if the invoice number contains slash separators
                                    if (typeof delivery.invoiceNumber === 'string' && delivery.invoiceNumber.includes(' ')) {
                                        // Split by slash and trim each invoice number
                                        const invoiceNumbers = delivery.invoiceNumber.split(' ').map(inv => inv.trim());
                                        
                                        // Group invoices into rows of exactly 5 per row
                                        for (let i = 0; i < invoiceNumbers.length; i += 5) {
                                            const chunk = invoiceNumbers.slice(i, i + 5);
                                            // Join the chunk with commas
                                            invoiceCell += chunk.join(', ');
                                            // Add line break if not the last row
                                            if (i + 5 < invoiceNumbers.length) {
                                                invoiceCell += '<br>';
                                            }
                                        }
                                    } else {
                                        // If no slashes, display the invoice number as is
                                        invoiceCell = delivery.invoiceNumber;
                                    }
                                    
                                    return `
                                    <tr>
                                        <td style="text-align: center">${index + 1}</td>
                                        <td class="invoice-number-cell">${invoiceCell}</td>
                                        <td style="text-align: center">${delivery.numberOfTankers}</td>
                                        <td style="text-align: center">₹${delivery.totalCost}</td>
                                    </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
        
                        <!-- Total Info -->
                        <div class="total-info">
                            <p><strong>Total Number of Tankers for the ${reportType === 'monthly' ? 'Month' : 'Week'}:</strong> ${totalTankers}</p>
                            <p><strong>Total Cost for the ${reportType === 'monthly' ? 'Month' : 'Week'}:</strong> ₹${totalCost}</p>
                        </div>
        
                        <!-- Bank Details -->
                        <div class="bank-details">
                            <div>
                                <p><strong>Bank Name:</strong> AXIS BANK LTD</p>
                                <p><strong>Account Number:</strong> 913020040594304</p>
                                <p><strong>GPay Number:</strong> +91 80558 59500</p>
                            </div>
                            <div>
                                <p><strong>IFSC Code:</strong> UTIB0001034</p>
                                <p><strong>Branch:</strong> HINJEWADI</p>
                            </div>
                        </div>
                        <div class="bank-details">
                            <div></div>
                            <div>
                                <p><strong>Sign:</strong> </p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        };
    
        // If the image fails to load, we can add a fallback or an alert here
        img.onerror = () => {
            console.error('Image failed to load');
            // Optionally, handle the error by displaying a default image or alerting the user
        };
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
                                            <button onClick={() => handlePrintReport(report)}><Printer size={15}/></button> {/* Print Button */}
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
                                            <button onClick={() => handlePrintReport(report)}><Printer size={15}/></button> {/* Print Button */}
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
