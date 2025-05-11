import React from 'react';
import styles from '../FinishedProducts/FinishedProducts.module.scss';
import logo from '../../assets/Wordmark Logo.png';
import { Tabs, Tab, useMediaQuery, Button } from '@mui/material';

const Sidebar = () => {
  const navItems = [
    "Dashboard",
    "Production",
    "Stock Request",
    "Add Stock",
    "Warehouse Stock",
    "User Management",
    "Stock Management",
  ];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Company logo" />
      </div>
      <nav className={styles.nav}>
        {navItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </nav>
    </aside>
  );
};

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
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
        >
          <Tab label="Fragrances" />
          <Tab label="Ingredients" />
          <Tab label="Packaging" />
          <Tab label="Produce Perfume" />
          <Tab label="Finished Products" />
        </Tabs>

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
                <hr/>
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
