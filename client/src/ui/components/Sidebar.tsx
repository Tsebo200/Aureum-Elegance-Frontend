// Sidebar.tsx
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../assets/Wordmark Logo.png";

function Sidebar() {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Production", path: "/finishedproducts" },
    { name: "Stock Request", path: "/stock-request" },
    { name: "Add Stock", path: "/add-stock" },
    { name: "Warehouse Stock", path: "/warehouse-stock" },
    { name: "Stock Management", path: "/stock-management" },
    { name: "Log Out", path: "/"}
  ];

  return (
  <aside className="sidebar">
  <div className="inner">
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
  </div>
  </aside>

  );
}

export default Sidebar;
