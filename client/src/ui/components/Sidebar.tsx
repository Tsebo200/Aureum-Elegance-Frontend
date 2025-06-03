// Sidebar.tsx
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../assets/Wordmark Logo.png";

function Sidebar() {
  const role = localStorage.getItem("role");

  // Define all navigation items
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Production", path: "/finishedproducts" },
    { name: "Stock Request", path: "/stock-request" },
    { name: "Add Stock", path: "/add-stock" },
    { name: "Warehouse Stock", path: "/warehouse-stock" },
    { name: "Admin Management", path: "/admin-management", adminOnly: true },
    { name: "Stock Management", path: "/stock-management" },
    { name: "Log Out", path: "/" }
  ];

  // Filter out the Admin Management link unless the user is actually an Admin
  const visibleNavItems = navItems.filter(item => {
    if (item.adminOnly && role !== "Admin") {
      return false;
    }
    return true;
  });

  return (
    <aside className="sidebar">
      <div className="inner">
        <div className="logo">
          <img src={logo} alt="Company logo" />
        </div>
        <nav className="navigation">
          {visibleNavItems.map((item, i) => (
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
