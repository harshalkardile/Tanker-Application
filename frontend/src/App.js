// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Entry from './components/Entry/Entry';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  
  return isAuthenticated ? children : <Navigate to="/Login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Entry />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;