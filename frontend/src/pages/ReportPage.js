import React from 'react';
import Reports from '../components/Reports/Reports';
import Monthly from '../components/Reports/Monthly/Monthly';
import Weekly from '../components/Reports/Weekly/Weekly';
import Daily from '../components/Reports/Daily/Daily';

const ReportPage = () => {
    return (
        <div>
            <h1>Reports</h1>
            <Reports />
            <Monthly />
            <Weekly />
            <Daily />
        </div>
    );
};

export default ReportPage;