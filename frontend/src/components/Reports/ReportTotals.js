import React from 'react';

const ReportTotals = ({ totalTankers, totalCost }) => {
    return (
        <div className="total">
            <p><strong>Total Tankers:</strong> {totalTankers}</p>
            <p><strong>Total Cost:</strong> ₹{totalCost}</p>
        </div>
    );
};

export default ReportTotals;