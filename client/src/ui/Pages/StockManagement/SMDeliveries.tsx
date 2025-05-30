import React from "react";
import styles from "./SMDeliveries.module.scss";

const StockTable: React.FC = () => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Supplier</div>
        <div className={styles.headerCell}>Warehouse</div>
        <div className={styles.headerCell}>Date Arrived</div>
        <div className={styles.headerCell}>Ordered</div>
        <div className={styles.headerCell}>Cost</div>
        <div className={styles.headerCell}></div>
      </div>
      <img
        className={styles.divider}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />
      <div className={styles.tableRow}>
        <div className={styles.cell}>Bergamot Oil</div>
        <div className={styles.cell}>Isaac's Fragrances</div>
        <div className={styles.cell}>1</div>
        <div className={styles.cell}>15/05/2025</div>
        <div className={styles.cell}>100</div>
        <div className={styles.cell}>R500,50</div>
        <div className={styles.cell}>
          <button className="acceptBtn">Accept</button>
          <button className="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
);

export const DeliveriesPanel: React.FC = () => (
  <div className={styles.content}>
    <h1 className={styles.title}>Deliveries</h1>
    <StockTable />
  </div>
);
