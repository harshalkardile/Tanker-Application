import React, { useState, useEffect } from 'react';
import { addDelivery, getBuildings } from '../../api';
import { Truck, Building, FileText, Clock, Calendar, Droplet, IndianRupee, Droplets } from 'lucide-react';
import './DeliveryForm.css';

const DeliveryForm = () => {
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
    }, []);

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
            const deliveryData = {
                ...formData,
                date: formData.selectedDate ? formData.selectedDate : new Date().toISOString().split('T')[0],
                numberOfTankers: Number(formData.numberOfTankers),
            };
            await addDelivery(deliveryData);
            alert('Delivery added successfully!');
            setFormData({
                buildingId: '',
                invoiceNumber: '',
                timeOfDelivery: 'Morning',
                numberOfTankers: '',
                selectedDate: '',
                tankerSize: '5000',
                price: '',
            });
            setAvailablePrices([]);
        } catch (error) {
            console.error('Failed to add delivery:', error);
            alert('Failed to add delivery. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <Truck size={24} />
                    <h2>Add Delivery</h2>
                </div>
                <form onSubmit={handleSubmit} className="building-form">
                    <div className="form-group">
                        <label>Building:</label>
                        <div className="input-wrapper">
                            <Building size={20} />
                            <select name="buildingId" value={formData.buildingId} onChange={handleBuildingChange} required>
                                <option value="">Select a Building</option>
                                {buildings.map((building) => (
                                    <option key={building._id} value={building._id}>
                                        {building.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {availablePrices.length > 0 && (
                        <div className="form-group">
                            <label>Price:</label>
                            <div className="input-wrapper">
                                <IndianRupee size={20} />
                                <select name="price" value={formData.price} onChange={handleChange} required>
                                    <option value="">Select Price</option>
                                    {availablePrices.map((price, index) => (
                                        <option key={index} value={price}>
                                            {price} per delivery
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Invoice Number:</label>
                        <div className="input-wrapper">
                            <FileText size={20} />
                            <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} placeholder="Enter Invoice Number" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Time of Delivery:</label>
                        <div className="input-wrapper">
                            <Clock size={20} />
                            <select name="timeOfDelivery" value={formData.timeOfDelivery} onChange={handleChange} required>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Number of Tankers:</label>
                        <div className="input-wrapper">
                            <Droplets size={20} />
                            <input type="number" name="numberOfTankers" value={formData.numberOfTankers} onChange={handleChange} placeholder="Enter Number of Tankers" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Select Delivery Date (Optional):</label>
                        <div className="input-wrapper">
                            <Calendar size={20} />
                            <input type="date" name="selectedDate" value={formData.selectedDate} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Select Tanker Size:</label>
                        <div className="input-wrapper">
                            <Droplet size={20} />
                            <select name="tankerSize" value={formData.tankerSize} onChange={handleChange} required>
                                <option value="5000">5000L</option>
                                <option value="10000">10000L</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">Add Delivery</button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryForm;
