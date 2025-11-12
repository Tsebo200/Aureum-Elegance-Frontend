import React, { useEffect, useState } from "react";
import styles from "./SMDeliveries.module.scss";
import type { Delivery, PostDelivery } from "../../services/models/deliveryModel";
import {
  getAllDeliveries,
  updateDelivery,
  deleteDelivery,
  createDelivery,
} from "../../services/DeliveryServiceRoute";
import type { Supplier } from "../../services/models/supplierModel";
import { getSuppliers } from "../../services/SupplierServiceRoute";
import type { Warehouse } from "../../services/models/warehouseModel";
import { getAllWarehouses } from "../../services/WarehouseServiceRoute";

const DeliveriesTable: React.FC<{
  data: Delivery[];
  onEditClick: (d: Delivery) => void;
  onDelete: (id: number) => void;
}> = ({ data, onEditClick, onDelete }) => (
  <div className={styles.tableContainer}>
    <div className={styles.tableWrapper}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Supplier</div>
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
          <div className={styles.cell}>{d.warehouseID}</div>
          <div className={styles.cell}>
            {new Date(d.deliveryDateArrived).toLocaleDateString()}
          </div>
          <div className={styles.cell}>
            {new Date(d.deliveryDateOrdered).toLocaleDateString()}
          </div>
          <div className={styles.cell}>{d.deliveryCost.toFixed(2)}</div>
          <div className={styles.cell}>
            <button
              className={styles.acceptBtn}
              onClick={() => onEditClick(d)}
            >
              Accept
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => onDelete(d.deliveryID)}
            >
              Cancel
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

export const DeliveriesPanel: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Suppliers for dropdown
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  // Warehouses for dropdown
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  // Holds the delivery being edited (null if adding).
  const [editing, setEditing] = useState<Delivery | null>(null);
  // When true, modal is open in “add” mode.
  const [adding, setAdding] = useState(false);

  // Form fields stored as strings
  const [supplierID, setSupplierID] = useState<string>("");
  const [warehouseID, setWarehouseID] = useState<string>("");
  const [dateArrived, setDateArrived] = useState<string>("");
  const [dateOrdered, setDateOrdered] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState<string>("");

  // Fetch all deliveries
  const fetchDeliveries = () => {
    setLoading(true);
    getAllDeliveries()
      .then((list) => {
        setDeliveries(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load deliveries.");
        setLoading(false);
      });
  };

  // Fetch all suppliers
  const fetchSuppliers = () => {
    getSuppliers()
      .then((list) => setSuppliers(list))
      .catch((err) => {
        console.error(err);
        // Even if this fails, the page can still show existing deliveries
      });
  };

  // Fetch all warehouses
  const fetchWarehouses = () => {
    getAllWarehouses()
      .then((list) => setWarehouses(list))
      .catch((err) => {
        console.error(err);
        // Even if this fails, the rest of the page remains usable
      });
  };

  useEffect(() => {
    fetchDeliveries();
    fetchSuppliers();
    fetchWarehouses();
  }, []);

  // Handle Delete (“Cancel”)
  const handleDelete = async (deliveryID: number) => {
    if (!window.confirm("Cancel (delete) this delivery?")) return;
    try {
      await deleteDelivery(deliveryID);
      fetchDeliveries();
    } catch (err) {
      console.error(err);
      setError("Failed to cancel delivery.");
    }
  };

  // Open modal in “edit” mode
  const handleEditClick = (d: Delivery) => {
    setAdding(false);
    setEditing(d);
    setError(null);

    // Convert required fields to string (guarding if undefined)
    setSupplierID(typeof d.supplierID === "number" ? d.supplierID.toString() : "");
    setWarehouseID(typeof d.warehouseID === "number" ? d.warehouseID.toString() : "");
    setDateArrived(d.deliveryDateArrived.split("T")[0]); // yyyy-MM-dd
    setDateOrdered(d.deliveryDateOrdered.split("T")[0]); // yyyy-MM-dd
    setDeliveryCost(typeof d.deliveryCost === "number" ? d.deliveryCost.toString() : "");
  };

  // Open modal in “add” mode
  const handleAddClick = () => {
    setEditing(null);
    setAdding(true);
    setError(null);

    // Reset form fields
    setSupplierID("");
    setWarehouseID("");
    setDateArrived("");
    setDateOrdered("");
    setDeliveryCost("");
  };

  // Close modal (for both add/edit)
  const closeModal = () => {
    setEditing(null);
    setAdding(false);
    setError(null);
  };

  // Handle form submission (add or edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation: all fields required
    if (
      supplierID.trim() === "" ||
      warehouseID.trim() === "" ||
      dateOrdered.trim() === "" ||
      dateArrived.trim() === "" ||
      deliveryCost.trim() === ""
    ) {
      setError("All fields are required.");
      return;
    }

    const payload: PostDelivery = {
      supplierID: Number(supplierID),
      warehouseID: Number(warehouseID),
      deliveryDateArrived: new Date(dateArrived).toISOString(),
      deliveryDateOrdered: new Date(dateOrdered).toISOString(),
      deliveryCost: Number(deliveryCost),
    };

    try {
      if (editing) {
        // Edit mode (PUT)
        await updateDelivery(editing.deliveryID, payload);
      } else {
        // Add mode (POST)
        await createDelivery(payload);
      }
      closeModal();
      fetchDeliveries();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save delivery.");
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Deliveries</h1>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <DeliveriesTable
            data={deliveries}
            onEditClick={handleEditClick}
            onDelete={handleDelete}
          />

          <button className={styles.addBtn} onClick={handleAddClick}>
            Add Delivery
          </button>
        </>
      )}

      {/* ---------- Modal Popup ---------- */}
      {(adding || editing) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{editing ? "Edit Delivery" : "Add Delivery"}</h2>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleFormSubmit} className={styles.modalForm}>
              <div className={styles.modalField}>
                <label className="font">Supplier:</label>
                <select
                  value={supplierID}
                  onChange={(e) => setSupplierID(e.target.value)}
                  required
                >
                  <option value="">Select a supplier</option>
                  {suppliers
                    .filter((s) => typeof s.supplierID === "number")
                    .map((s) => (
                      <option
                        key={s.supplierID}
                        value={s.supplierID.toString()}
                      >
                        {s.supplierName}
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.modalField}>
                <label>Warehouse:</label>
                <select
                  value={warehouseID}
                  onChange={(e) => setWarehouseID(e.target.value)}
                  required
                >
                  <option value="">Select a warehouse</option>
                  {warehouses
                    .filter((w) => typeof w.warehouseID === "number")
                    .map((w) => (
                      <option
                        key={w.warehouseID}
                        value={w.warehouseID.toString()}
                      >
                        {w.name}
                      </option>
                    ))}
                </select>
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

export default DeliveriesPanel;
