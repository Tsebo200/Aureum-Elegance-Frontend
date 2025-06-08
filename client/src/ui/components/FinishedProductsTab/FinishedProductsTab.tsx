import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./FinishedProductsTab.module.scss";
import {
  getFinishedProducts,
  deleteFinishedProduct,
  UpdateFinishedProduct,
  UpdateFinishedProductPackaging,
} from "../../services/FinishedProductService";
import type {
  FinishedProductDTO,
  FinishedProductPackaging,
  PostFinishedProductPackaging,
} from "../../services/models/finishedProductModel";
import {
  addBatch,
  addBatchFinishedProduct,
} from "../../services/BatchFinishedProductServiceRoute";
import type { PostBatchFinishedProduct } from "../../services/models/batchFinishedProductModel";
import type { PostBatch } from "../../services/models/batchModel";

const FinishedProductsTab = () => {
  const [finishedProducts, setFinishedProducts] = useState<
    FinishedProductDTO[]
  >([]);
  const [producingRows, setProducingRows] = useState<Set<number>>(new Set());
  const [producedAmounts, setProducedAmounts] = useState<{
    [id: number]: number;
  }>({});
  const [finalBatch, setFinalBatch] = useState<
    { productID: number; amount: number }[]
  >([]);
  const [editingProduct, setEditingProduct] =
    useState<FinishedProductDTO | null>(null);
  const [editForm, setEditForm] = useState<{
    productName: string;
    quantity: number;
    fragranceID: number;
  }>({
    productName: "",
    quantity: 0,
    fragranceID: 0,
  });
  const [packagingEdits, setPackagingEdits] = useState<{
    [packagingId: number]: number;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFinishedProducts();
        setFinishedProducts(data);
      } catch (error) {
        console.error("Error fetching finished products:", error);
      }
    };
    fetchData();
  }, []);

  // Produce handlers
  const startProducing = (id: number) => {
    setProducingRows((prev) => new Set(prev).add(id));
  };

  const handleAmountChange = (id: number, value: number) => {
    setProducedAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancelProduce = () => {
    setProducingRows(new Set());
    setProducedAmounts({});
    setFinalBatch([]);
  };

  const handleConfirmProduce = async () => {
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

      // Create BatchFinishedProducts
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

      setProducingRows(new Set());
      setProducedAmounts({});
      setFinalBatch([]);
      alert("Batch and finished products created successfully!");
    } catch (error) {
      console.error("Batch creation failed:", error);
      alert("Error during batch creation.");
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    try {
      await deleteFinishedProduct(id);
      setFinishedProducts((prev) => prev.filter((p) => p.productID !== id));
    } catch (error) {
      console.error("Error deleting finished product:", error);
    }
  };

  // Edit modal handlers
  const handleEditClick = (product: FinishedProductDTO) => {
    setEditingProduct(product);
    setEditForm({
      productName: product.productName ?? "",
      quantity: product.quantity,
      fragranceID: product.fragrance?.id ?? 0,
    });

    // Initialize packaging edits with current amounts
    const packEdits: { [packagingId: number]: number } = {};
    product.finishedProductPackaging?.forEach((pack) => {
      if (pack.packaging?.id !== undefined) {
        packEdits[pack.packaging.id] = pack.amount;
      }
    });
    setPackagingEdits(packEdits);
  };

  const handleEditFormChange = (
    field: keyof typeof editForm,
    value: string | number
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: typeof value === "string" && value === "" ? 0 : value,
    }));
  };
  

  const handlePackagingAmountChange = (packagingId: number, value: number) => {
    console.log("Packaging change:", packagingId, value);
    setPackagingEdits((prev) => ({ ...prev, [packagingId]: value }));
  };

  async function handleSaveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Important!

    if (!editingProduct) {
      alert("No product selected for editing.");
      return;
    }

    try {
      console.log("Saving product:", editingProduct);
      console.log("Packaging edits:", packagingEdits);

      await UpdateFinishedProduct({
        productID: editingProduct.productID,
        productName: editForm.productName,
        quantity: editForm.quantity,
        fragranceID: editForm.fragranceID,
      });
      for (const [packagingIdStr, amount] of Object.entries(packagingEdits)) {
        const packagingId = Number(packagingIdStr);
        await UpdateFinishedProductPackaging({
          ProductID: editingProduct.productID,
          PackagingId: packagingId,
          Amount: amount,
        });
      }

      alert("Finished product and packaging updated!");
      setEditingProduct(null); // optionally close modal on success
    } catch (error) {
      console.error("Error updating finished product:", error);
      alert("Failed to update finished product. Check console.");
    }
  }
  
  
  

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <section className={styles.content}>
      <h1>Finished Products</h1>

      {/* Produce confirmation buttons */}
      {Object.keys(producedAmounts).length > 0 && (
        <div className={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmProduce}
            className={styles.Btn}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelProduce}
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
            <th colSpan={2}>Actions</th>
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
                  <Button
                    onClick={() => handleEditClick(product)}
                    className={styles.Btn}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete(product.productID)}
                    className={styles.Btn}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Finished Product</h2>
            <form className={styles.modalForm} onSubmit={handleSaveEdit}>
              <div className={styles.modalField}>
                <label>Product Name</label>
                <input
                  type="text"
                  value={editForm.productName}
                  onChange={(e) =>
                    handleEditFormChange("productName", e.target.value)
                  }
                />
              </div>

              <div className={styles.modalField}>
                <label>Quantity</label>
                <input
                  type="number"
                  value={editForm.quantity}
                  onChange={(e) =>
                    handleEditFormChange("quantity", Number(e.target.value))
                  }
                />
              </div>

              <div className={styles.modalField}>
                <label>Fragrance ID</label>
                <input
                  type="number"
                  value={editForm.fragranceID}
                  onChange={(e) =>
                    handleEditFormChange("fragranceID", Number(e.target.value))
                  }
                />
              </div>

              <h3>Packaging Amounts</h3>
              {editingProduct.finishedProductPackaging?.map((pack, index) => {
                try {
                  if (!pack.packaging) {
                    console.warn("Missing packaging at index", index, pack);
                    return null;
                  }
                  if (pack.packaging.id === undefined) {
                    console.warn(
                      "Packaging id undefined at index",
                      index,
                      pack.packaging
                    );
                    return null;
                  }

                  const packagingId = pack.packaging.id;

                  return (
                    <div key={packagingId} className={styles.modalField}>
                      <label>{pack.packaging.name}</label>
                      <input
                        type="number"
                        min={0}
                        value={packagingEdits[packagingId] ?? pack.amount}
                        onChange={(e) =>
                          handlePackagingAmountChange(
                            packagingId,
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  );
                } catch (err) {
                  console.error(
                    "Error rendering packaging input at index",
                    index,
                    err
                  );
                  return null;
                }
              })}

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.editBtn}>
                  Save
                </button>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinishedProductsTab;
