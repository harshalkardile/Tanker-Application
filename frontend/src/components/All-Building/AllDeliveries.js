import React, { useEffect, useState } from 'react';
import { getAllDeliveries, deleteDelivery } from '../../api';
import { Truck, FilePenLine, Trash, Search } from 'lucide-react';
import './BuildingList.css';

const AllDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const response = await getAllDeliveries();
            setDeliveries(response.data.reverse());
        } catch (error) {
            console.error('Failed to fetch deliveries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this delivery?')) {
            try {
                await deleteDelivery(id);
                alert('Delivery deleted successfully');
                fetchDeliveries();
            } catch (error) {
                console.error('Failed to delete delivery:', error);
                alert('Failed to delete delivery');
            }
        }
    };

    const filteredDeliveries = deliveries.filter(delivery => 
        delivery.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='report-container'>
            <div className='report-card'>
                <div className='report-header'>
                    <Truck size={24} />
                    <h2>Deliveries</h2>
                </div>
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type='text'
                        placeholder='Search by invoice number...'
                        className='search-box'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='total-count'>
                    <p>Total Deliveries: {filteredDeliveries.length}</p>
                </div>
                
                {loading ? (
                    <p className='loading-message'>Loading deliveries...</p>
                ) : filteredDeliveries.length > 0 ? (
                    <div className="table-container">
                        <table className='report-table delivery-table'>
                            <thead>
                                <tr>
                                    <th>Building</th>
                                    <th>Invoice No.</th>
                                    <th>Date</th>
                                    {/* <th>Time</th> */}
                                    <th>Tankers</th>
                                    <th>Size (L)</th>
                                    <th>Price (₹)</th>
                                    <th>Total (₹)</th>
                                    {/* <th>Update</th> */}
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDeliveries.map((delivery) => (
                                    <tr key={delivery._id}>
                                        <td>{delivery.buildingId?.name || 'N/A'}</td>
                                        <td>{delivery.invoiceNumber}</td>
                                        <td>{new Date(delivery.date).toLocaleDateString('en-GB')}</td>
                                        {/* <td>{delivery.timeOfDelivery}</td> */}
                                        <td>{delivery.numberOfTankers}</td>
                                        <td>{delivery.tankerSize}</td>
                                        <td>₹{delivery.price}</td>
                                        <td>₹{delivery.price * delivery.numberOfTankers}</td>
                                        {/* <td><button className='updatebutton'><FilePenLine size={20} /></button></td> */}
                                        <td><button className='deletebutton' onClick={() => handleDelete(delivery._id)}><Trash size={20} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='no-data'>No deliveries found.</p>
                )}
            </div>
        </div>
    );
};

export default AllDeliveries;