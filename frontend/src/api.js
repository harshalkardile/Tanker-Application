import axios from 'axios';

export const API_URL = 'http://localhost:5000/api'; // Adjust if your backend runs on a different port

export const getBuildings = () => axios.get(`${API_URL}/buildings`);
export const addBuilding = (buildingData) => axios.post(`${API_URL}/buildings`, buildingData);
export const addDelivery = (deliveryData) => axios.post(`${API_URL}/deliveries`, deliveryData);
export const getDeliveriesByDate = (date) => axios.get(`${API_URL}/deliveries/${date}`);
export const getWeeklyReport = () => axios.get(`${API_URL}/reports/weekly`);
export const getMonthlyReport = () => axios.get(`${API_URL}/reports/monthly`);
export const getYearlyReport = () => axios.get(`${API_URL}/reports/yearly`);