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
               <title>Invoice: Daily</title>
            <style>
                :root {
                    --primary: #1a5fb4;
                    --text: #2c3e50;
                    --secondary: #f8f9fa;
                    --border: #dee2e6;
                    --accent: #e9ecef;
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    background: #f1f3f5;
                    color: var(--text);
                    line-height: 1.5;
                    padding: 2rem;
                }

                .invoice-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .header {
                    padding: 2rem;
                    border-bottom: 1px solid var(--border);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .company-logo {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .logo {
                    width: 48px;
                    height: 48px;
                    background: var(--primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 20px;
                }

                .company-name {
                    font-size: 24px;
                    color: var(--primary);
                    font-weight: 600;
                }

                .invoice-details {
                    text-align: right;
                }

                .invoice-id {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .main-content {
                    padding: 2rem;
                }

                .metadata {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    margin-bottom: 2rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid var(--border);
                }

                .info-group h2 {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .info-group p {
                    margin: 0.25rem 0;
                    color: var(--text);
                }

                .items-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                }

                .items-table th {
                    background: var(--secondary);
                    text-align: left;
                    padding: 1rem;
                    font-weight: 600;
                    color: var(--text);
                    border-bottom: 2px solid var(--border);
                }

                .items-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--border);
                }

                .items-table tr:hover {
                    background: var(--secondary);
                }

                .table-footer {
                    margin-top: 2rem;
                    display: flex;
                    justify-content: flex-end;
                }

                .totals {
                    width: 300px;
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                }

                .total-row.final {
                    font-weight: 600;
                    font-size: 18px;
                    border-top: 2px solid var(--border);
                    margin-top: 0.5rem;
                    padding-top: 1rem;
                }

                .payment-details {
                    background: var(--secondary);
                    padding: 2rem;
                    margin-top: 2rem;
                }

                .payment-details h2 {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: var(--primary);
                }

                .footer {
                    padding: 2rem;
                    text-align: center;
                    border-top: 1px solid var(--border);
                    color: #6c757d;
                    font-size: 14px;
                }

                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }

                    .invoice-container {
                        box-shadow: none;
                    }
                }

                @media (max-width: 768px) {
                    .metadata {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .header {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .invoice-details {
                        text-align: left;
                    }
                }
            </style>
            </head>
            <body>
             <div class="invoice-container">
            <div class="header">
                <div class="company-logo">
                    <div class="logo">
                    <img src="../src/components/Default-component/dnyaneshwarmaharaj.png" alt="logo" width="50" height="50" />
                    </div>
                    <div>
                        <div class="company-name">Shree Yogiraj Water Supplier</div>
                    </div>
                </div>
                <div class="invoice-details">
                    <div class="invoice-id">Invoice #2025-0234</div>
                    <div>Issue Date: ${selectedDate}</div>
                    
                </div>
            </div>
            <div class="main-content">
              <table class="items-table">
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

            <div class="table-footer">
                <div class="totals">
                    <div class="total-row">
                        <span>Subtotal</span>
                        <span>₹${calculateDailyTotals().totalCost} </span>
                    </div>
                     <div class="total-row">
                        <span>Total Tankers</span>
                        <span>${calculateDailyTotals().totalTankers}</span>
                    </div>
                    <div class="total-row final">
                        <span>Total </span>
                        <span>₹${calculateDailyTotals().totalCost}</span>
                    </div>
                </div>
            </div>

            <div class="payment-details">
                <h2>Payment Information</h2>
                <p>Please include invoice number with your payment</p>
                <p>Bank: National Business Bank</p>
                <p>Account Name: Atlas Corporation</p>
                <p>Account Number: 1234567890</p>
                <p>Routing Number: 987654321</p>
                <p>SWIFT Code: ATLASUS12</p>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your business. Payment is due within 30 days.</p>
            <p>For any queries, please contact our accounts department.</p>
        </div>
           <footer>

            </footer>
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