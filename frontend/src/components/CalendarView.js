import React, { useState } from 'react';
import { getDeliveriesByDate } from '../api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
    const [deliveries, setDeliveries] = useState([]);

    const handleDateChange = async (newDate) => {
        setDate(newDate);
        try {
            const formattedDate = newDate.toISOString().split('T')[0];
            const response = await getDeliveriesByDate(formattedDate);
            setDeliveries(response.data);
        } catch (error) {
            console.error('Failed to fetch deliveries:', error);
        }
    };

    return (
        <div>
            <h2>Calendar View</h2>
            <Calendar onChange={handleDateChange} value={date} />
            <h3>Deliveries on {date.toDateString()}</h3>
            {deliveries.length > 0 ? (
                <ul>
                    {deliveries.map((delivery) => (
                        <li key={delivery._id}>
                            Building ID: {delivery.buildingId}, Quantity: {delivery.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No deliveries found for this date.</p>
            )}
        </div>
    );
};

export default CalendarView;