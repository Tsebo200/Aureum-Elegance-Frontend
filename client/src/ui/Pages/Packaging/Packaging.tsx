import React, { useEffect, useState } from "react";
import styles from "./PackagingPanel.module.scss";
import type { Packaging } from "../../services/models/packagingModel";
import { getAllPackaging } from "../../services/PackagingServiceRoute";

const PackagingTable: React.FC<{ data: Packaging[] }> = ({ data }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Stock Qty</div>
        <div className={styles.headerCell}></div>
      </div>
      <img
        className={styles.divider}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />

      {data.map((pkg) => (
        <div key={pkg.id} className={styles.tableRow}>
          <div className={styles.cell}>{pkg.name}</div>
          <div className={styles.cell}>{pkg.type ?? "-"}</div>
          <div className={styles.cell}>{pkg.stock}</div>
          <div className={styles.cell}>
            <button className={styles.Btn}>Request Stock</button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className={styles.placeholder}>No packaging found.</div>
      )}
    </div>
  </div>
);

export const PackagingPanel: React.FC = () => {
  const [packaging, setPackaging] = useState<Packaging[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPackaging()
      .then((list) => {
        setPackaging(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load packaging.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Packaging</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && <PackagingTable data={packaging} />}
    </div>
  );
};

export default PackagingPanel;
