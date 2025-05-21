import React from "react";
import styles from "./Ingredients.module.scss";

const IngredientsTable: React.FC = () => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Cost per Unit</div>
        <div className={styles.headerCell}>Expiry Date</div>
        <div className={styles.headerCell}>Units litres/stock</div>
        <div className={styles.headerCell}></div>
      </div>
      <img
        className={styles.divider}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />
      <div className={styles.tableRow}>
        <div className={styles.cell}>Bergamot Oil</div>
        <div className={styles.cell}>Essensial Oil</div>
        <div className={styles.cell}>R1 000.00</div>
        <div className={styles.cell}>15/05/2025</div>
        <div className={styles.cell}>100</div>
        <div className={styles.cell}><button className={styles.Btn}>Stock Request</button></div>
      </div>
    </div>
  </div>
);

export const IngredientsPanel: React.FC = () => (
  <div className={styles.content}>
    <h1 className={styles.title}>Ingredients</h1>
    <IngredientsTable />
  </div>
);
