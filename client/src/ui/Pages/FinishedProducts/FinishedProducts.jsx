import React from 'react';
import { Link } from 'react-router-dom'
import styles from './FinishedProducts.module.scss';
import sidebarStyles from './Sidebar.module.scss';
import Logo from '../assets/Logo.png';
import { Tabs, Tab, useMediaQuery, Button } from '@mui/material';

export default function FinishedProducts() {
  const [tab, setTab] = React.useState(4); // Default to "Finished Products" tab
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleTabChange = (e, val) => setTab(val);

  return (
    <div className={styles.container}>
      <aside className={sidebarStyles.sidebar}>
        <img src={Logo} alt="AE Logo" className={sidebarStyles.logo} />
        <ul className={sidebarStyles.nav}>
          {['Dashboard', 'Production', 'Stock Request', 'Add Stock', 'Warehouse Stock', 'User Management', 'Stock Management']
            .map(item => <li key={item}>{item}</li>)}
        </ul>
      </aside>

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

        <section className={styles.content}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Cost per unit</th>
                <th>Status</th>
                <th>Batches Finished</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Moonlit Jasmine</td>
                <td>Bergamot Oil, Vanillin Powder, Stabilizers</td>
                <td>R 45, 00</td>
                <td>In Progress</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
