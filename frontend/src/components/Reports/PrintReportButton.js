import React from 'react';

const PrintReportButton = ({ onPrint }) => {
    return (
        <button className="submit-button" onClick={onPrint}>Print Report</button>
    );
};

export default PrintReportButton;