import React, { useEffect, useState } from 'react';
import { getBuildings } from '../../api';
import { Building } from 'lucide-react';
import './BuildingList.css';

const BuildingList = () => {
    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await getBuildings();
                setBuildings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch buildings:', error);
            }
        };

        fetchBuildings();
    }, []);

    return (
        
        <div className='.form-card'>
        <div className="report-container">
            <div className="report-card">
                <div className="report-header">
                    <Building size={24} />
                    <h2>Buildings</h2>
                </div>
                {buildings.length > 0 ? (
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Building Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buildings.map((building) => (
                                <tr key={building._id}>
                                    <td>{building.name}</td>
                                    <td>{building.address}</td>
                                    <td>
                                            ₹{building.chargePerTanker.length > 1 
                                            ? building.chargePerTanker.join(" | ₹") 
                                            : building.chargePerTanker[0]}
                                    </td>
                                    <td><button className="updatebutton">Update</button></td>
                                    <td><button className="deletebutton">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data">No buildings found.</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default BuildingList;
