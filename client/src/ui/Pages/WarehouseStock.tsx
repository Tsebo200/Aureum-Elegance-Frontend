import React from "react";
import styles from "./WarehouseStock.module.scss";
import { Tabs, Tab, useMediaQuery, Button } from "@mui/material";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";

function WarehouseStock() {
  const [tab, setTab] = React.useState(0);
  const isMobile = useMediaQuery("(max-width:768px)");
  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  // Dummy data for now
  const stockData = [{ ingredient: "Bergamot Oil", quantity: 100 }];

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

        {tab === 0 && (
          <div className={styles.content}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <select className={styles.select}>
                  <option>Stock Selection</option>
                </select>
                <div className={styles.ingredientBtn}>Ingredients</div>
              </div>

              <Link to="/add-stock" className={styles.link}>
                <Button className={styles.addBtn}>Add Stock</Button>
              </Link>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th> Ingredients</th>
                  <th>Units in litres In Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ingredient}</td>
                    <td>{item.quantity}</td>
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
              <div>Total Stock</div>
              <div>100</div>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div className={styles.content}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <select className={styles.select}>
                  <option>Stock Selection</option>
                </select>
                <div className={styles.ingredientBtn}>Ingredients</div>
              </div>
              <Button className={styles.addBtn}>Add Stock</Button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th> Ingredients</th>
                  <th>Units in litres In Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ingredient}</td>
                    <td>{item.quantity}</td>
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
              <div>Total Stock</div>
              <div>100</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default WarehouseStock;
