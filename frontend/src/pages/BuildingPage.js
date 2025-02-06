import React from 'react';
import BuildingList from '../components/All-Building/BuildingList';
import AddBuilding from '../components/Add-Building/AddBuilding';
import DeliveryForm from '../components/Add-delivery/DeliveryForm';

const BuildingPage = () => {
    return (
        <div>
            <h1>Building Management</h1>
            <h2>Add a New Building</h2>
            <AddBuilding />
            <h2>All Buildings</h2>
            <BuildingList />
            <h2>Add Delivery for a Building</h2>
            <DeliveryForm />
        </div>
    );
};

export default BuildingPage;