import React from 'react';
import styles from '../FinishedProducts/FinishedProducts.module.scss';
import { Button, Tabs, Tab, useMediaQuery } from "@mui/material";
import Sidebar from '../../Components/Sidebar';
import ProducePerfumeForm from '../../Components/Forms/FinishedProductComponents/ProducePerfumeForm';
import FragrancesComponent from '../../components/FragrancesComponent/FragrancesComponent';
import { IngredientsPanel } from '../Ingredients/Ingredients';

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
          <FragrancesComponent />
        )}
        
        {tab === 1 && (
          <section className={styles.content}>
            <IngredientsPanel />
          </section>
        )}

         {tab === 2 && (
          <section className={styles.content}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cost per unit</th>
                  <th>Units in kilograms</th>
                </tr>
                <hr />
              </thead>
              <tbody>
                <tr>
                  <td>Glass Bottles</td>
                  <td>R600,00</td>
                  <td>680</td>
                  <td>
                    <Button className={styles.Btn}>Request Stock</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {tab === 3 && (
          <ProducePerfumeForm />
          
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

