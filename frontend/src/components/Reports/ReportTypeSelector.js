import React from 'react';

const ReportTypeSelector = ({ onReportTypeChange }) => {
    return (
        <div className="report-type-selector">
            <button onClick={() => onReportTypeChange('daily')}>Daily</button>
            <button onClick={() => onReportTypeChange('weekly')}>Weekly</button>
            <button onClick={() => onReportTypeChange('monthly')}>Monthly</button>
        </div>
    );
};

export default ReportTypeSelector;