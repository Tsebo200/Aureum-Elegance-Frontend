import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./Packaging.module.scss";
import type { Packaging, PostPackaging } from "../../services/models/packagingModel";
import {
  getAllPackaging,
  deletePackaging,
  updatePackaging,
} from "../../services/packagingServiceRoute";

const PackagingTable: React.FC<{
  data: Packaging[];
  onDelete: (id: number) => void;
  onEditClick: (pkg: Packaging) => void;
}> = ({ data, onDelete, onEditClick }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Name</div>
        <div className={styles.headerCell}>Type</div>
        <div className={styles.headerCell}>Stock Qty</div>
        <div className={styles.headerCell}>Actions</div>
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
            <Button
              className={styles.editBtn}
              onClick={() => onEditClick(pkg)}
            >
              Edit
            </Button>
            <Button
              className={styles.deleteBtn}
              onClick={() => onDelete(pkg.id)}
            >
              Delete
            </Button>
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

  // Holds the packaging item currently being edited (or null)
  const [editing, setEditing] = useState<Packaging | null>(null);
  // Form fields for the popup
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editStock, setEditStock] = useState<number | "">("");

  // Fetch all packaging items
  const fetchPackaging = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchPackaging();
  }, []);

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this packaging item?")) return;
    try {
      await deletePackaging(id);
      fetchPackaging();
    } catch (err) {
      console.error(err);
      setError("Failed to delete packaging.");
    }
  };

  // When “Edit” is clicked, open modal and prefill form fields
  const handleEditClick = (pkg: Packaging) => {
    setEditing(pkg);
    setEditName(pkg.name);
    setEditType(pkg.type ?? "");
    setEditStock(pkg.stock);
  };

  // Handle modal form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const payload: PostPackaging & { id: number } = {
      id: editing.id,
      name: editName,
      type: editType,
      stock: Number(editStock),
    };

    try {
      await updatePackaging(editing.id, { name: editName, type: editType, stock: Number(editStock) });
      setEditing(null);
      fetchPackaging();
    } catch (err) {
      console.error(err);
      setError("Failed to update packaging.");
    }
  };

  // Close modal without saving
  const handleCancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Packaging</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <PackagingTable
          data={packaging}
          onDelete={handleDelete}
          onEditClick={handleEditClick}
        />
      )}

      {/* ---------- Modal Popup ---------- */}
      {editing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Packaging</h2>
            <form onSubmit={handleEditSubmit} className={styles.modalForm}>
              <div className={styles.modalField}>
                <label>Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.modalField}>
                <label>Type:</label>
                <input
                  type="text"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                />
              </div>
              <div className={styles.modalField}>
                <label>Stock Quantity:</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.valueAsNumber || "")}
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

export default PackagingPanel;
