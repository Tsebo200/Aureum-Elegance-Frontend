import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./FinishedProductsTab.module.scss"
import {
  getFinishedProducts,
  deleteFinishedProduct,
} from "../../services/FinishedProductService";
import type { FinishedProductDTO } from "../../services/models/finishedProductModel";
import { addBatch, addBatchFinishedProduct } from "../../services/BatchFinishedProductServiceRoute";
import type { PostBatchFinishedProduct } from "../../services/models/batchFinishedProductModel";
import type { PostBatch } from "../../services/models/batchModel";

const FinishedProductsTab = () => {
  const [finishedProducts, setFinishedProducts] = useState<FinishedProductDTO[]>([]);
  const [producingRows, setProducingRows] = useState<Set<number>>(new Set());
  const [producedAmounts, setProducedAmounts] = useState<{ [id: number]: number }>({});
  const [finalBatch, setFinalBatch] = useState<{ productID: number; amount: number }[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFinishedProducts();
        console.log("Fetched finished products:", data);
        setFinishedProducts(data);
      } catch (error) {
        console.error("Error fetching finished products:", error);
      }
    };
    fetchData();
  }, []);

  const startProducing = (id: number) => {
    setProducingRows((prev) => new Set(prev).add(id));
  };

  const handleAmountChange = (id: number, value: number) => {
    setProducedAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancel = () => {
    setProducingRows(new Set());
    setProducedAmounts({});
    setFinalBatch([]);
  };
  

  const handleConfirm = async () => {
    const batchEntries = Object.entries(producedAmounts)
      .filter(([_, amount]) => amount > 0)
      .map(([productID, amount]) => ({
        productID: Number(productID),
        amount,
      }));

    if (batchEntries.length === 0) return;


    const totalAmount = batchEntries.reduce((acc, b) => acc + b.amount, 0);
    const batchData: PostBatch = {
      ProductionDate: new Date().toISOString(),
      BatchSize: totalAmount,
      Status: "Processing",
    };

    try {
      const createdBatch = await addBatch(batchData);

      // 2. Create BatchFinishedProducts
      await Promise.all(
        batchEntries.map((entry) => {
          const batchFinishedProduct: PostBatchFinishedProduct = {
            batchID: createdBatch.batchID,
            productID: entry.productID,
            quantity: entry.amount,
            unit: "Kilograms", 
            status: "Processing",
            warehouseID: 1, 
          };
          return addBatchFinishedProduct(batchFinishedProduct);
        })
      );

      // Clear state after success
      setProducingRows(new Set());
      setProducedAmounts({});
      setFinalBatch([]);
      alert("Batch and finished products created successfully!");
    } catch (error) {
      console.error("Batch creation failed:", error);
      alert("Error during batch creation.");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteFinishedProduct(id);
      setFinishedProducts((prev) => prev.filter((p) => p.productID !== id));
    } catch (error) {
      console.error("Error deleting finished product:", error);
    }
  };

  return (
    <section className={styles.content}>
      <h1>Finished Products</h1>
      {Object.keys(producedAmounts).length > 0 && (
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            className={styles.Btn}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            className={styles.Btn}
          >
            Cancel
          </Button>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>Name</th>
            <th>Fragrance name</th>
            <th>Quantity</th>
            <th>Packaging</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finishedProducts.map((product) => {
            const isProducing = producingRows.has(product.productID);
            return (
              <tr key={product.productID}>
                <td>{product.productName}</td>
                <td>{product.fragrance?.name}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.finishedProductPackaging
                    ?.map((pkg) => `${pkg.packaging?.name} (${pkg.amount})`)
                    .join(", ")}
                </td>
                <td>
                  {isProducing ? (
                    <TextField
                      type="number"
                      size="small"
                      placeholder="Amount"
                      value={producedAmounts[product.productID] || ""}
                      onChange={(e) =>
                        handleAmountChange(
                          product.productID,
                          Number(e.target.value)
                        )
                      }
                      className={styles.amountInput}
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => startProducing(product.productID)}
                      className={styles.Btn}
                    >
                      Produce
                    </Button>
                  )}
                </td>
                <td>
                  <Button className={styles.Btn}>Edit</Button>
                  <Button
                    className={styles.Btn}
                    color="error"
                    onClick={() => handleDelete(product.productID)}
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

export default FinishedProductsTab;
