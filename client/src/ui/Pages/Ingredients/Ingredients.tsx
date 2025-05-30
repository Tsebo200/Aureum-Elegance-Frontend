import React, { useEffect, useState } from "react";
import styles from "./Ingredients.module.scss";
import type { Ingredient } from "../../services/models/ingredientModel";
import { getAllIngredients } from "../../services/IngredientsServiceRoutes";

const IngredientsTable: React.FC<{ data: Ingredient[] }> = ({ data }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Cost per Unit</div>
        <div className={styles.headerCell}>Expiry Date</div>
        <div className={styles.headerCell}>Units (Litres/Stock)</div>
        <div className={styles.headerCell}></div>
      </div>
      <img
        className={styles.divider}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />

      {data.map((ing) => (
        <div key={ing.id} className={styles.tableRow}>
          <div className={styles.cell}>{ing.name}</div>
          <div className={styles.cell}>{ing.type}</div>
          <div className={styles.cell}>{ing.cost}</div>
          <div className={styles.cell}>
            {new Date(ing.expiryDate).toLocaleDateString()}
          </div>
          <div className={styles.cell}>{ing.stockRequests?.length ?? "-"}</div>
          <div className={styles.cell}>
            <button className={styles.Btn}>Stock Request</button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className={styles.placeholder}>
          No ingredients found.
        </div>
      )}
    </div>
  </div>
);

export const IngredientsPanel: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllIngredients()
      .then((list) => {
        setIngredients(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load ingredients.");
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Ingredients</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <IngredientsTable data={ingredients} />
      )}
    </div>
  );
};
