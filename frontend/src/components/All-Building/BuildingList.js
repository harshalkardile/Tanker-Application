import React, { useEffect, useState } from 'react';
import { getBuildings, deleteBuilding } from '../../api';
import { Building, FilePenLine, Trash, Search } from 'lucide-react';
import './BuildingList.css';

const BuildingList = () => {
    const [buildings, setBuildings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();
                setBuildings(response.data.reverse());
            } catch (error) {
                console.error('Failed to fetch buildings:', error);
            }
        };
        fetchBuildings();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this building?')) {
            try {
                await deleteBuilding(id);
                alert('Building deleted successfully');
                const response = await getBuildings();
                setBuildings(response.data.reverse());
            } catch (error) {
                console.error('Failed to delete building:', error);
                alert('Failed to delete building');
            }
        }
    };

    const filteredBuildings = buildings.filter(building =>
        building.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='report-container'>
            <div className='report-card'>
                <div className='report-header'>
                    <Building size={24} />
                    <h2>Buildings</h2>
                </div>
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by building name..."
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='total-count'>
                    <p>Total Buildings: {filteredBuildings.length}</p>
                </div>
                
                {filteredBuildings.length > 0 ? (
                    <div className="table-container">
                         <table className='report-table delivery-table'>
                            <thead>
                                <tr>
                                    <th>Building Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBuildings.map((building) => (
                                    <tr key={building._id}>
                                        <td>{building.name}</td>
                                        <td>{building.address}</td>
                                        <td>₹{building.chargePerTanker.length > 1 ? building.chargePerTanker.join(' | ₹') : building.chargePerTanker[0]}</td>
                                        <td><button className='updatebutton'><FilePenLine size={20} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='no-data'>No buildings found.</p>
                )}
            </div>
        </div>
    );
};

export default BuildingList;