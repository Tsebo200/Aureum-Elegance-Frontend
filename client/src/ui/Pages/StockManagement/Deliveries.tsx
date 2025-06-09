import React, { useState } from "react";
import styles from "./SMDeliveries.module.scss";

type Delivery = {
  deliveryID: number;
  item: string;
  supplierID: string;   // Changed to string for manual input
  warehouseID: string;  // Changed to string for manual input
  deliveryDateArrived: string; // yyyy-MM-dd
  deliveryDateOrdered: string; // yyyy-MM-dd
  deliveryCost: number;
};

const DeliveriesTable: React.FC<{
  data: Delivery[];
  onEditClick: (d: Delivery) => void;
  onDelete: (id: number) => void;
}> = ({ data, onEditClick, onDelete }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Supplier</div>
        <div className={styles.headerCell}>Item</div> 
        <div className={styles.headerCell}>Warehouse</div>
        <div className={styles.headerCell}>Date Arrived</div>
        <div className={styles.headerCell}>Date Ordered</div>
        <div className={styles.headerCell}>Cost (R)</div>
        <div className={styles.headerCell}>Actions</div>
      </div>
      <img
        className={styles.divider}
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5afaa8086b8aee00cac15f6ac5e0636244f1bf9f?placeholderIfAbsent=true"
        alt=""
      />
      {data.map((d) => (
        <div key={d.deliveryID} className={styles.tableRow}>
          <div className={styles.cell}>{d.supplierID}</div>
          <div className={styles.cell}>{d.item}</div> 
          <div className={styles.cell}>{d.warehouseID}</div>
          <div className={styles.cell}>{d.deliveryDateArrived}</div>
          <div className={styles.cell}>{d.deliveryDateOrdered}</div>
          <div className={styles.cell}>{d.deliveryCost.toFixed(2)}</div>
          <div className={styles.cell}>
            <button
              className={styles.acceptBtn}
              onClick={() => onEditClick(d)}
            >
              Edit
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => onDelete(d.deliveryID)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className={styles.placeholder}>No deliveries found.</div>
      )}
    </div>
  </div>
);

export const DeliverablesPanelStandalone: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [editing, setEditing] = useState<Delivery | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [supplierID, setSupplierID] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [warehouseID, setWarehouseID] = useState<string>("");
  const [dateArrived, setDateArrived] = useState<string>("");
  const [dateOrdered, setDateOrdered] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState<string>("");

  const resetForm = () => {
    setSupplierID("");
    setItem("");
    setWarehouseID("");
    setDateArrived("");
    setDateOrdered("");
    setDeliveryCost("");
  };

  const handleAddClick = () => {
    resetForm();
    setEditing(null);
    setAdding(true);
    setError(null);
  };

  const handleEditClick = (d: Delivery) => {
    setEditing(d);
    setAdding(false);
    setError(null);
    setSupplierID(d.supplierID);
    setItem(d.item);
    setWarehouseID(d.warehouseID);
    setDateArrived(d.deliveryDateArrived);
    setDateOrdered(d.deliveryDateOrdered);
    setDeliveryCost(d.deliveryCost.toString());
  };

  const handleDelete = (id: number) => {
    if (!window.confirm("Delete this delivery?")) return;
    setDeliveries((prev) => prev.filter((d) => d.deliveryID !== id));
  };

  const closeModal = () => {
    setAdding(false);
    setEditing(null);
    setError(null);
    resetForm();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !supplierID.trim() ||
      !item.trim() ||
      !warehouseID.trim() ||
      !dateArrived.trim() ||
      !dateOrdered.trim() ||
      !deliveryCost.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    const costNum = Number(deliveryCost);
    if (isNaN(costNum) || costNum < 0) {
      setError("Delivery cost must be a valid positive number.");
      return;
    }

    if (editing) {
      // Update existing
      setDeliveries((prev) =>
        prev.map((d) =>
          d.deliveryID === editing.deliveryID
            ? {
                ...d,
                supplierID,
                item,
                warehouseID,
                deliveryDateArrived: dateArrived,
                deliveryDateOrdered: dateOrdered,
                deliveryCost: costNum,
              }
            : d
        )
      );
    } else {
      // Add new
      const newDelivery: Delivery = {
        deliveryID:
          deliveries.length > 0
            ? Math.max(...deliveries.map((d) => d.deliveryID)) + 1
            : 1,
        supplierID,
        item,
        warehouseID,
        deliveryDateArrived: dateArrived,
        deliveryDateOrdered: dateOrdered,
        deliveryCost: costNum,
      };
      setDeliveries((prev) => [...prev, newDelivery]);
    }

    closeModal();
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Deliveries </h1>

      <DeliveriesTable
        data={deliveries}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
      />

      <button className={styles.addBtn} onClick={handleAddClick}>
        Add Delivery
      </button>

      {(adding || editing) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{editing ? "Edit Delivery" : "Add Delivery"}</h2>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleFormSubmit} className={styles.modalForm}>
              <div className={styles.modalField}>
                <label>Supplier:</label>
                <input
                  type="text"
                  value={supplierID}
                  onChange={(e) => setSupplierID(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalField}>
                <label>Item:</label>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalField}>
                <label>Warehouse:</label>
                <input
                  type="text"
                  value={warehouseID}
                  onChange={(e) => setWarehouseID(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalField}>
                <label>Delivery Date Ordered:</label>
                <input
                  type="date"
                  value={dateOrdered}
                  onChange={(e) => setDateOrdered(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalField}>
                <label>Delivery Date Arrived:</label>
                <input
                  type="date"
                  value={dateArrived}
                  onChange={(e) => setDateArrived(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalField}>
                <label>Delivery Cost (R):</label>
                <input
                  type="number"
                  step="0.01"
                  value={deliveryCost}
                  onChange={(e) => setDeliveryCost(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.acceptBtn}>
                  {editing ? "Save Changes" : "Create"}
                </button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverablesPanelStandalone;
