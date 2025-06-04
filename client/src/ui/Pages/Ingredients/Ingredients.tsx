import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Ingredients.module.scss";
import type { Ingredient, PostIngredient } from "../../services/models/ingredientModel";
import {
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
} from "../../services/IngredientsServiceRoutes";

const IngredientsTable: React.FC<{
  data: Ingredient[];
  onDelete: (id: number) => void;
  onEditClick: (ing: Ingredient) => void;
}> = ({ data, onDelete, onEditClick }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Cost per Unit</div>
        <div className={styles.headerCell}>Expiry Date</div>
        <div className={styles.headerCell}>Expired?</div>
        <div className={styles.headerCell}>Actions</div>
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
          <div className={styles.cell}>{ing.isExpired ? "Yes" : "No"}</div>
          <div className={styles.cell}>
            <Button
              className={styles.editBtn}
              onClick={() => onEditClick(ing)}
            >
              Edit
            </Button>
            <Button
              className={styles.deleteBtn}
              onClick={() => onDelete(ing.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <div className={styles.placeholder}>No ingredients found.</div>
      )}
    </div>
  </div>
);

export const IngredientsPanel: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Holds the ingredient currently being edited (or null if none)
  const [editing, setEditing] = useState<Ingredient | null>(null);
  // Form fields for the popup
  const [editCost, setEditCost] = useState("");
  const [editExpiry, setEditExpiry] = useState("");

  // Load all ingredients from backend
  const fetchIngredients = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  // Handle delete as before
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this ingredient?")) return;
    try {
      await deleteIngredient(id);
      fetchIngredients();
    } catch (err) {
      console.error(err);
      setError("Failed to delete ingredient.");
    }
  };

  // When “Edit” is clicked, open the modal and prefill form fields
  const handleEditClick = (ing: Ingredient) => {
    setEditing(ing);
    setEditCost(ing.cost);
    // Convert to yyyy-MM-dd for input type="date" value
    setEditExpiry(ing.expiryDate.split("T")[0]);
  };

  // Handle modal form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const payload: PostIngredient & { id: number } = {
      id: editing.id,
      name: editing.name,
      type: editing.type,
      cost: editCost,
      expiryDate: new Date(editExpiry).toISOString(),
      isExpired: new Date(editExpiry) < new Date(),
    };

    try {
      await updateIngredient(payload);
      setEditing(null);
      fetchIngredients();
    } catch (err) {
      console.error(err);
      setError("Failed to update ingredient.");
    }
  };

  // Close the modal (without saving)
  const handleCancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Ingredients</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <IngredientsTable
          data={ingredients}
          onDelete={handleDelete}
          onEditClick={handleEditClick}
        />
      )}

      {/* ---------- Modal Popup ---------- */}
      {editing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Ingredient</h2>
            <form onSubmit={handleEditSubmit} className={styles.modalForm}>
              <div className={styles.modalField}>
                <label>Name:</label>
                <input type="text" value={editing.name} readOnly />
              </div>
              <div className={styles.modalField}>
                <label>Type:</label>
                <input type="text" value={editing.type} readOnly />
              </div>
              <div className={styles.modalField}>
                <label>Cost per Unit (R):</label>
                <input
                  type="text"
                  value={editCost}
                  onChange={(e) => setEditCost(e.target.value)}
                  required
                />
              </div>
              <div className={styles.modalField}>
                <label>Expiry Date:</label>
                <input
                  type="date"
                  value={editExpiry}
                  onChange={(e) => setEditExpiry(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalButtons}>
                <Button type="submit" className={styles.editBtn}>
                  Save
                </Button>
                <Button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientsPanel;

