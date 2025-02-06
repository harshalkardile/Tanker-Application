import React from 'react';

const PrintReportButton = ({ onPrint }) => {
    return (
        <button className='generate-rp' onClick={onPrint}>Print Report</button>
    );
};

export default PrintReportButton;