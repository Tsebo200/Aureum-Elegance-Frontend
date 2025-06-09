import React from "react";
import styles from "./WarehouseStock.module.scss";
import { Tabs, Tab, useMediaQuery, Button } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";

const WarehouseStock = () => {
  const [tab, setTab] = React.useState(0);
  const [stockType, setStockType] = React.useState("Ingredients");
  const isMobile = useMediaQuery("(max-width:768px)");
  const handleTabChange = (_event: React.SyntheticEvent, val: number) =>
    setTab(val);

  const warehouseStockData = {
    0: {
      Ingredients: [
        { name: "Bergamot Oil", amount: 100, volume: "10L" },
        { name: "Cedarwood", amount: 50, volume: "5L" },
      ],
      Fragrances: [
        { name: "Citrus Bliss", amount: 30, volume: "15L" },
        { name: "Ocean Breeze", amount: 20, volume: "12L" },
      ],
      Packaging: [
        { name: "Glass Bottle 100ml", amount: 200, volume: "20L" },
        { name: "Spray Cap", amount: 300, volume: "N/A" },
      ],
    },
    1: {
      Ingredients: [
        { name: "Lavender", amount: 120, volume: "12L" },
        { name: "Rosemary", amount: 80, volume: "8L" },
      ],
      Fragrances: [
        { name: "Floral Mist", amount: 25, volume: "10L" },
        { name: "Herbal Garden", amount: 18, volume: "9L" },
      ],
      Packaging: [
        { name: "Plastic Bottle 200ml", amount: 150, volume: "30L" },
        { name: "Dropper Cap", amount: 400, volume: "N/A" },
      ],
    },
  };

  const currentStock =
    warehouseStockData[tab][stockType as keyof (typeof warehouseStockData)[0]];

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          className={styles.tabs}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
        >
          <Tab label="Warehouse 1" />
          <Tab label="Warehouse 2" />
        </Tabs>

        <div className={styles.content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <div>
              <select
                className={styles.select}
                value={stockType}
                onChange={(e) => setStockType(e.target.value)}
              >
                <option value="Ingredients">Ingredients</option>
                <option value="Fragrances">Fragrances</option>
                <option value="Packaging">Packaging</option>
              </select>
              <div className={styles.ingredientBtn}>{stockType}</div>
            </div>

            <Link to="/add-stock" className={styles.link}>
              <Button className={styles.addBtn}>Add Stock</Button>
            </Link>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.volume}</td>
                  <td>
                    <Button className={styles.Btn}>Request Stock</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2rem",
            }}
          >
            <div>Total Items</div>
            <div>
              {currentStock.reduce((total, item) => total + item.amount, 0)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WarehouseStock;
