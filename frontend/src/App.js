import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BuildingPage from './pages/BuildingPage';
import ReportPage from './pages/ReportPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buildings" element={<BuildingPage />} />
                <Route path="/reports" element={<ReportPage />} />
            </Routes>
        </Router>
    );
};

export default App;