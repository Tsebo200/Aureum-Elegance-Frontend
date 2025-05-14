import React, { useState } from "react";
import logo from "../../assets/Wordmark Logo.png";
import "./SMDeliveries.scss";

// Reuse your “correct” Sidebar
const Sidebar: React.FC = () => {
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
          <a key={i} href={`#${item.replace(/\s+/g, "-").toLowerCase()}`} className="nav-item">
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
};

const TabsAndContent: React.FC = () => {
  const tabs = ["Suppliers", "Deliveries", "Waste Loss", "Record Loss"];
  const [active, setActive] = useState(0);

  return (
    <section className="tabs-section">
      <div className="tabs-container">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`tab${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {active === 1 ? (
          <StockTable />
        ) : (
          <div className="placeholder">
            <p>{tabs[active]} content goes here.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const StockTable: React.FC = () => (
  <section className="table-container">
    <div className="table-wrapper">
      <div className="table-header">
        <div className="header-cell">Name</div>
        <div className="header-cell">Supplier</div>
        <div className="header-cell">Warehouse</div>
        <div className="header-cell">Date Arrived</div>
        <div className="header-cell">Ordered</div>
        <div className="header-cell">Cost</div>
      </div>
      <img
        className="divider"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />
      <div className="table-row">
        <div className="cell">Bergamot Oil</div>
        <div className="cell">Isaac's Fragrances</div>
        <div className="cell">1</div>
        <div className="cell">15/05/2025</div>
        <div className="cell">100</div>
        <div className="cell">R500,50</div>
      </div>
    </div>
  </section>
);

const SMDelivery: React.FC = () => (
  <div className="stock-management-wrapper">
    <Sidebar />
    <main className="main-content">
      <TabsAndContent />
    </main>
  </div>
);

export default SMDelivery;
