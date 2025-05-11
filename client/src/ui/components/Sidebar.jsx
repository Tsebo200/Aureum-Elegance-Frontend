import React from "react";
import  "./Sidebar.scss";
import logo from '../assets/Wordmark Logo.png';
function Sidebar () {
  const navItems = [
    "Dashboard",
    "Production",
    "Stock Request",
    "Add Stock",
    "Warehouse Stock",
    "User Management",
    "Stock Management",
  ];
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company logo" />
      </div>
      <nav className="navigation">
        {navItems.map((item, i) => (
          <a key={i} href="#" className="nav-item">
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
