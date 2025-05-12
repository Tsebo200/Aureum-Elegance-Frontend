// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../assets/Wordmark Logo.png";

function Sidebar() {
  const navItems = [
    // { label: "Dashboard", path: "/" },
    { name: "Production", path: "/" },
    { name: "Stock Request", path: "/stock-request" },
    { name: "Add Stock", path: "/add-stock" },
    { name: "Warehouse Stock", path: "/warehouse-stock" },
    { name: "User Management", path: "/user-management" },
    { name: "Stock Management", path: "/stock-management" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company logo" />
      </div>
      <nav className="navigation">
        {navItems.map((item, i) => (
          <Link key={i} to={item.path} className="nav-item">
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
