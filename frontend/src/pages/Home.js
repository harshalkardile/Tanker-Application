import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Home.css';

const Home = () => {
    return (
        <div className="layout-container">
            <div className="nav-container">
                <Navbar />
            </div>
            
            <div className="main-layout">
                <div className="sidebar-container">
                    <Sidebar />
                </div>
                
                {/* <div className="content-container">
                    <nav className="navigation-menu">
                        <ul>
                            <li>
                                <Link to="/buildings">Manage Buildings</Link>
                            </li>
                            <li>
                                <Link to="/reports">View Reports</Link>
                            </li>
                        </ul>
                    </nav>
                </div> */}
            </div>
        </div>
    );
};

export default Home;