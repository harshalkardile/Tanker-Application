import React from 'react';

const DatePicker = ({ selectedDate, onDateChange }) => {
    return (
        <div className="date-picker">
            <label htmlFor="datePicker">Select Date: </label>
            <input
                type="date"
                id="datePicker"
                value={selectedDate}
                onChange={onDateChange}
            />
        </div>
    );
};

export default DatePicker;