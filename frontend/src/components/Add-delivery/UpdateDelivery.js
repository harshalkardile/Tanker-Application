import React, { useState, useEffect } from 'react';
import { getBuildings, updateDelivery } from '../../api';
import { Truck, Building, FileText, Clock, Calendar, Droplet, IndianRupee, Droplets } from 'lucide-react';
import './DeliveryForm.css';

const UpdateDelivery = ({ delivery, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
        buildingId: '',
        invoiceNumber: '',
        timeOfDelivery: 'Morning',
        numberOfTankers: '',
        selectedDate: '',
        tankerSize: '5000',
        price: '',
    });

    const [buildings, setBuildings] = useState([]);
    const [availablePrices, setAvailablePrices] = useState([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();
                setBuildings(response.data);
            } catch (error) {
                console.error('Failed to fetch buildings:', error);
            }
        };

        fetchBuildings();
        setFormData({
            buildingId: delivery.buildingId?._id || '',
            invoiceNumber: delivery.invoiceNumber || '',
            timeOfDelivery: delivery.timeOfDelivery || 'Morning',
            numberOfTankers: delivery.numberOfTankers || '',
            selectedDate: delivery.date ? new Date(delivery.date).toISOString().split('T')[0] : '',
            tankerSize: delivery.tankerSize || '5000',
            price: delivery.price || '',
        });
    }, [delivery]);

    const handleBuildingChange = (e) => {
        const { value } = e.target;
        const selectedBuilding = buildings.find(building => building._id === value);
        setFormData({ ...formData, buildingId: value, price: '' });
        setAvailablePrices(selectedBuilding ? selectedBuilding.chargePerTanker : []);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedDeliveryData = {
                ...formData,
                date: formData.selectedDate ? formData.selectedDate : new Date().toISOString().split('T')[0],
                numberOfTankers: Number(formData.numberOfTankers),
            };
            await updateDelivery(delivery._id, updatedDeliveryData);
            alert('Delivery updated successfully!');
            onUpdateSuccess();
        } catch (error) {
            console.error('Failed to update delivery:', error);
            alert('Failed to update delivery. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <Truck size={24} />
                    <h2>Update Delivery</h2>
                </div>
                <form onSubmit={handleSubmit} className="building-form">
                    <div className="form-group">
                        <label>Building:</label>
                        <select name="buildingId" value={formData.buildingId} onChange={handleBuildingChange} required>
                            {buildings.map((building) => (
                                <option key={building._id} value={building._id}>
                                    {building.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Invoice Number:</label>
                        <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Number of Tankers:</label>
                        <input type="number" name="numberOfTankers" value={formData.numberOfTankers} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-button">Update Delivery</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDelivery;