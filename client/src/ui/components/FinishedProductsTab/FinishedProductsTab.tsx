import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./FinishedProductsTab.module.scss"
import {
  getFinishedProducts,
  deleteFinishedProduct,
} from "../../services/FinishedProductService";
import type { FinishedProductDTO } from "../../services/models/finishedProductModel";

const FinishedProductsTab = () => {
  const [finishedProducts, setFinishedProducts] = useState<
    FinishedProductDTO[]
  >([]);

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
          {finishedProducts.map((product) => (
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
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default FinishedProductsTab;
