import React, { useState } from 'react';
import { Building, MapPin, IndianRupee, Plus, Trash } from 'lucide-react';
import { addBuilding } from '../../api';
import './AddBuilding.css';

const AddBuilding = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [chargePerTanker, setChargePerTanker] = useState([]);
    const [priceInput, setPriceInput] = useState('');

    const handleAddPrice = () => {
        if (priceInput && !isNaN(priceInput)) {
            setChargePerTanker([...chargePerTanker, Number(priceInput)]);
            setPriceInput('');
        }
    };

    const handleRemovePrice = (index) => {
        setChargePerTanker(chargePerTanker.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBuilding({ name, address, chargePerTanker });
            alert('Building added successfully!');
            setName('');
            setAddress('');
            setChargePerTanker([]);
        } catch (error) {
            console.error('Failed to add building:', error);
            alert('Failed to add building. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <Building size={24} />
                    <h2>Add New Building</h2>
                </div>

                <form onSubmit={handleSubmit} className="building-form">
                    <div className="form-group">
                        <label>Building Name</label>
                        <div className="input-wrapper">
                            <Building size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter building name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <div className="input-wrapper">
                            <MapPin size={20} />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter building address"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Charge Per Tanker</label>
                        <div className="input-group">
                            <div className="input-wrapper">
                                <IndianRupee size={20} />
                                <input
                                    type="number"
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                    placeholder="Enter charge per tanker"
                                    min="0" 
                                    onWheel={(e) => e.target.blur()} 
                                />
                            </div>
                            <button type="button" className="add-price-button" onClick={handleAddPrice}>
                                <Plus size={20} />
                            </button>
                        </div>
                   
                       
                        <ul className="price-list">
                            {chargePerTanker.map((price, index) => (
                                <li key={index} className="price-item">
                                    ₹{price} 
                                    <button type="button" className="remove-price-button" onClick={() => handleRemovePrice(index)}>
                                        <Trash size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit" className="submit-button">
                        Add Building
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBuilding;
