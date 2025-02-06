import React from 'react';
import './DeliveryTable.css';

const DeliveryTable = ({ deliveries, toggleExpand, expandedDeliveryId, reportType, weeklyReport, monthlyReport }) => {
    const calculateDailyTotals = () => {
        const totalTankers = deliveries.reduce((sum, delivery) => sum + delivery.numberOfTankers, 0);
        const totalCost = deliveries.reduce((sum, delivery) => sum + delivery.totalCost, 0);
        return { totalTankers, totalCost };
    };

    const DropdownIcon = () => (
        <svg 
            className="dropdown-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );

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
                                            <th></th>
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
                                                    <td><DropdownIcon /></td>
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
                                    <p><strong>Total Tankers:</strong> {calculateDailyTotals().totalTankers}</p>
                                    <p><strong>Total Cost:</strong> ₹{calculateDailyTotals().totalCost}</p>
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
                                    <th></th>
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
                                            <td><DropdownIcon /></td>
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
                                    <th></th>
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
                                            <td><DropdownIcon /></td>
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