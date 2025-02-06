import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DefaultComponent.css';
import Maharaj from './dnyaneshwarmaharaj.png';
import { getBuildings, API_URL } from '../../api';

const DefaultComponent = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [totalBuildings, setTotalBuildings] = useState(0);
    const [totalTankers, setTotalTankers] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        // Get current date
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('en-IN'));

        // Function to update time dynamically
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString('en-IN'));
        };

        // Update time every second
        const timeInterval = setInterval(updateTime, 1000);
        
        // Initial call to set time immediately
        updateTime();

        // Fetch total buildings
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();
                setTotalBuildings(response.data.length || 0);
            } catch (error) {
                console.error('Error fetching buildings:', error);
                setTotalBuildings(0);
            }
        };

        // Fetch total tanker visits for the current month
        const fetchMonthlyTankers = async () => {
            const month = now.getMonth() + 1; // JavaScript months are 0-indexed
            const year = now.getFullYear();
            try {
                const response = await axios.get(`${API_URL}/reports/monthly?month=${month}&year=${year}`);
                setTotalTankers(response.data.totalMonthlyTankers || 0);
                setTotalProfit(response.data.totalMonthlyCost || 0);
            } catch (error) {
                console.error('Error fetching monthly tanker visits:', error);
                setTotalTankers(0);
                setTotalProfit(0);
            }
        };

        // Fetch total profit for the current month (if it's calculated based on tankers, for example)
   

        fetchBuildings();
        fetchMonthlyTankers();
     

        // Cleanup the interval on component unmount
        return () => clearInterval(timeInterval);
    }, []);

    return (
        <div className="default-container">
            <div className="default-card">
                <p className="date-time">{currentDate} | {currentTime}</p>
                <div className="kpi-container">
                    <div className="kpi-box">
                        <h3>Buildings Count</h3>
                        <p>{totalBuildings}</p>
                    </div>
                    <div className="kpi-box">
                        <h3>Monthly Tanker Visits</h3>
                        <p>{totalTankers}</p>
                    </div>
                    <div className="kpi-box">
                        <h3>Monthly Profit</h3>
                        <p>₹{totalProfit}</p>
                    </div>
                </div>
                <div className='image-container'>
                <img src={Maharaj} alt="Tanker" className="tanker-img" />
                {/* <h1 className="company-name">योगीराज वॉटर सप्लायर्स</h1> */}
                </div>
            </div>
        </div>
    );
};

export default DefaultComponent;
