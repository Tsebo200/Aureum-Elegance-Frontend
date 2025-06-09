import React, { useEffect, useState } from "react";
import styles from "./BatchComponent.module.scss";
import { getBatch } from "../../services/BatchFinishedProductServiceRoute";
import type {
  Batch,
  BatchFinishedProductInBatch,
} from "../../services/models/batchModel";
import { Button } from "@mui/material";

const BatchComponent = () => {
    const [batches, setBatches] = useState<Batch[]>([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await getBatch();
          setBatches(data);
        } catch (error) {
          console.error("Error fetching batches:", error);
        }
      }

      fetchData();
    }, []);

    const handleEdit = (batchID: number) => {
      console.log("Edit batch:", batchID);
      // Your edit logic here
    };

    const handleDelete = (batchID: number) => {
      console.log("Delete batch:", batchID);
      // Your delete logic here
    };

    return (
      <section className={styles.content}>
        <h1>Batches Overview</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Production Date</th>
              <th>Products</th>
              <th>Total Quantity</th>
              <th>Status</th>
              <th>Warehouse ID(s)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => {
              const products = batch.batchFinishedProducts || [];

              const warehouseIDs = Array.from(
                new Set(products.map((p) => p.warehouseID))
              ).join(", ");

              return (
                <tr key={batch.batchID}>
                  <td>{batch.batchID}</td>
                  <td>{new Date(batch.productionDate).toLocaleDateString()}</td>
                  <td>
                    {batch.batchFinishedProducts?.map((p) => (
                      <div key={`${batch.batchID}-${p.productID}`}>
                        {p.productName} – {p.quantity} {p.unit}
                      </div>
                    ))}
                  </td>
                  <td>{batch.batchSize}</td>
                  <td>{batch.status}</td>
                  <td>{warehouseIDs}</td>
                  <td>
                    <Button
                      className={styles.Btn}
                      onClick={() => handleEdit(batch.batchID)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={styles.Btn}
                      onClick={() => handleDelete(batch.batchID)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
};

export default BatchComponent;
