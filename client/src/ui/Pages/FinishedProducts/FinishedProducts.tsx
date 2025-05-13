import React from 'react';
import styles from '../FinishedProducts/FinishedProducts.module.scss';
import { TextField, Button, Tabs, Tab, useMediaQuery } from "@mui/material";
import Sidebar from '../../Components/Sidebar';

export default function FinishedProducts() {
  const [tab, setTab] = React.useState(4);
  const isMobile = useMediaQuery('(max-width:768px)');
  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.warehouseTabs}>
          <Button className={styles.warehouseBtn}>Warehouse 1</Button>
          <Button className={styles.warehouseBtn}>Warehouse 2</Button>
        </div>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          className={styles.tabs}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
        >
          <Tab label="Fragrances" />
          <Tab label="Ingredients" />
          <Tab label="Packaging" />
          <Tab label="Produce Perfume" />
          <Tab label="Finished Products" />
        </Tabs>

        {tab === 0 && (
          <section className={styles.content}>
            <h1>Fragrances</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Cost per unit</th>
                  <th>Amount in Stock</th>
                </tr>
                <hr />
              </thead>
              <tbody>
                <tr>
                  <td>Moonlit Jasmine</td>
                  <td>Bergamot Oil, Vanillin Powder, Stabilizers</td>
                  <td>R 45.00</td>
                  <td>100</td>
                  <td>
                    <Button className={styles.Btn}>Produce</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {tab === 3 && (
          <section className={styles.content}>
            <h1>Produce Perfume</h1>
            <form className={styles.form}>
              <div className={styles.field}>
                <label>Name</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  multiline
                  minRows={4}
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Cost Per Unit</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Volume Per Bottle (in millilitres)</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Ingredients</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Quantities Used</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Packaging</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <div className={styles.field}>
                <label>Batches</label>
                <TextField
                  placeholder="..."
                  fullWidth
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              <br />
              <Button variant="contained" className={styles.addBtn}>
                Produce Perfume
              </Button>
            </form>
          </section>
        )}

        {tab === 4 && (
          <section className={styles.content}>
            <h1>Finished Products</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Cost per unit</th>
                  <th>Status</th>
                  <th>Batches Finished</th>
                </tr>
                <hr />
              </thead>
              <tbody>
                <tr>
                  <td>Moonlit Jasmine</td>
                  <td>Bergamot Oil, Vanillin Powder, Stabilizers</td>
                  <td>R 45.00</td>
                  <td>In Progress</td>
                  <td>100</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

