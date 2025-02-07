// import React, { useState } from 'react';
// import { Building, Truck, BarChart2, Plus, List, Calendar } from 'lucide-react';
// import AddBuilding from '../Add-Building/AddBuilding';
// import BuildingList from '../All-Building/BuildingList';
// import DeliveryForm from '../Add-delivery/DeliveryForm';
// import Monthly from '../Reports/Monthly/Monthly';
// import Weekly from '../Reports/Weekly/Weekly';
// import Daily from '../Reports/Daily/Daily';
// import DefaultComponent from '../Default-component/DefaultComponent';
// import './Sidebar.css';

// const Sidebar = () => {
//   const [activeTab, setActiveTab] = useState('default'); // Set initial activeTab to 'default'
//   const [expandedMenu, setExpandedMenu] = useState('');
//   const [activeContent, setActiveContent] = useState(<DefaultComponent />); // Set DefaultComponent as initial content

//   const toggleMenu = (menu) => {
//     setExpandedMenu(expandedMenu === menu ? '' : menu);
//     setActiveTab('default'); // Reset to default when closing a menu
//   };

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     switch (tab) {
//       case 'add-building':
//         setActiveContent(<AddBuilding />);
//         break;
//       case 'show-building':
//         setActiveContent(<BuildingList />);
//         break;
//       case 'add-delivery':
//         setActiveContent(<DeliveryForm />);
//         break;
//       case 'daily':
//         setActiveContent(<Daily />);
//         break;
//       case 'weekly':
//         setActiveContent(<Weekly />);
//         break;
//       case 'monthly':
//         setActiveContent(<Monthly />);
//         break;
//       default:
//         setActiveContent(<DefaultComponent />);
//     }
//   };

//   return (
//     <div className="layout-wrapper">
//       <div className="sidebar">
//         {/* Buildings Section */}
//         <div className="sidebar-section">
//           <button
//             className={`sidebar-button ${expandedMenu === 'buildings' ? 'active' : ''}`}
//             onClick={() => toggleMenu('buildings')}
//           >
//             <Building size={20} />
//             <span>Buildings</span>
//           </button>

//           {expandedMenu === 'buildings' && (
//             <div className="submenu">
//               <button
//                 className={`submenu-item ${activeTab === 'add-building' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('add-building')}
//               >
//                 <Plus size={16} />
//                 <span>Add Building</span>
//               </button>
//               <button
//                 className={`submenu-item ${activeTab === 'show-building' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('show-building')}
//               >
//                 <List size={16} />
//                 <span>Show Building</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Deliveries Section */}
//         <div className="sidebar-section">
//           <button
//             className={`sidebar-button ${expandedMenu === 'deliveries' ? 'active' : ''}`}
//             onClick={() => toggleMenu('deliveries')}
//           >
//             <Truck size={20} />
//             <span>Deliveries</span>
//           </button>

//           {expandedMenu === 'deliveries' && (
//             <div className="submenu">
//               <button
//                 className={`submenu-item ${activeTab === 'add-delivery' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('add-delivery')}
//               >
//                 <Plus size={16} />
//                 <span>Add Delivery</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Reports Section */}
//         <div className="sidebar-section">
//           <button
//             className={`sidebar-button ${expandedMenu === 'reports' ? 'active' : ''}`}
//             onClick={() => toggleMenu('reports')}
//           >
//             <BarChart2 size={20} />
//             <span>Reports</span>
//           </button>

//           {expandedMenu === 'reports' && (
//             <div className="submenu">
//               <button
//                 className={`submenu-item ${activeTab === 'daily' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('daily')}
//               >
//                 <Calendar size={16} />
//                 <span>Daily</span>
//               </button>
//               <button
//                 className={`submenu-item ${activeTab === 'weekly' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('weekly')}
//               >
//                 <Calendar size={16} />
//                 <span>Weekly</span>
//               </button>
//               <button
//                 className={`submenu-item ${activeTab === 'monthly' ? 'active' : ''}`}
//                 onClick={() => handleTabClick('monthly')}
//               >
//                 <Calendar size={16} />
//                 <span>Monthly</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="content-area">{activeContent}</div>
//     </div>
//   );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { Building, Truck, BarChart2, Plus, List, Calendar } from 'lucide-react';
import AddBuilding from '../Add-Building/AddBuilding';
import BuildingList from '../All-Building/BuildingList';
import DeliveryForm from '../Add-delivery/DeliveryForm';
import Monthly from '../Reports/Monthly/Monthly';
import Weekly from '../Reports/Weekly/Weekly';
import Daily from '../Reports/Daily/Daily';
import DefaultComponent from '../Default-component/DefaultComponent';
import './Sidebar.css';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('default'); 
  const [expandedMenus, setExpandedMenus] = useState({ buildings: false, deliveries: false, reports: false });
  const [activeContent, setActiveContent] = useState(<DefaultComponent />);

  const toggleMenu = (menu) => {
    setExpandedMenus((prevMenus) => ({ ...prevMenus, [menu]: !prevMenus[menu] }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'add-building':
        setActiveContent(<AddBuilding />);
        break;
      case 'show-building':
        setActiveContent(<BuildingList />);
        break;
      case 'add-delivery':
        setActiveContent(<DeliveryForm />);
        break;
      case 'daily':
        setActiveContent(<Daily />);
        break;
      case 'weekly':
        setActiveContent(<Weekly />);
        break;
      case 'monthly':
        setActiveContent(<Monthly />);
        break;
      default:
        setActiveContent(<DefaultComponent />);
    }
  };

  return (
    <div className="layout-wrapper">
      <div className="sidebar">
        <div className="sidebar-section">
          <button className={`sidebar-button ${expandedMenus.buildings ? 'active' : ''}`} onClick={() => toggleMenu('buildings')}>
            <Building size={20} />
            <span>Buildings</span>
          </button>
          {expandedMenus.buildings && (
            <div className="submenu">
              <button className={`submenu-item ${activeTab === 'add-building' ? 'active' : ''}`} onClick={() => handleTabClick('add-building')}>
                <Plus size={16} />
                <span>Add Building</span>
              </button>
              <button className={`submenu-item ${activeTab === 'show-building' ? 'active' : ''}`} onClick={() => handleTabClick('show-building')}>
                <List size={16} />
                <span>Show Building</span>
              </button>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <button className={`sidebar-button ${expandedMenus.deliveries ? 'active' : ''}`} onClick={() => toggleMenu('deliveries')}>
            <Truck size={20} />
            <span>Deliveries</span>
          </button>
          {expandedMenus.deliveries && (
            <div className="submenu">
              <button className={`submenu-item ${activeTab === 'add-delivery' ? 'active' : ''}`} onClick={() => handleTabClick('add-delivery')}>
                <Plus size={16} />
                <span>Add Delivery</span>
              </button>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <button className={`sidebar-button ${expandedMenus.reports ? 'active' : ''}`} onClick={() => toggleMenu('reports')}>
            <BarChart2 size={20} />
            <span>Reports</span>
          </button>
          {expandedMenus.reports && (
            <div className="submenu">
              <button className={`submenu-item ${activeTab === 'daily' ? 'active' : ''}`} onClick={() => handleTabClick('daily')}>
                <Calendar size={16} />
                <span>Daily</span>
              </button>
              <button className={`submenu-item ${activeTab === 'weekly' ? 'active' : ''}`} onClick={() => handleTabClick('weekly')}>
                <Calendar size={16} />
                <span>Weekly</span>
              </button>
              <button className={`submenu-item ${activeTab === 'monthly' ? 'active' : ''}`} onClick={() => handleTabClick('monthly')}>
                <Calendar size={16} />
                <span>Monthly</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="content-area">{activeContent}</div>
    </div>
  );
};

export default Sidebar;