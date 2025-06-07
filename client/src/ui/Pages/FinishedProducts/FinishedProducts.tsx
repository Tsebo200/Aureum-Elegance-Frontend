import React, { useState, useEffect } from 'react';
import styles from '../FinishedProducts/FinishedProducts.module.scss';
import { Button, Tabs, Tab, useMediaQuery } from "@mui/material";
import Sidebar from '../../Components/Sidebar';
import ProducePerfumeForm from '../../Components/Forms/FinishedProductComponents/ProducePerfumeForm';
import FragrancesComponent from '../../Components/FragrancesComponent/FragrancesComponent';
import { IngredientsPanel } from '../Ingredients/Ingredients';
import type { Fragrance } from '../../services/models/fragranceModel';
import { getFinishedProducts } from '../../services/BatchFinishedProductServiceRoute';
import type { BatchFinishedProduct } from '../../services/models/batchFinishedProductModel';
import FinishedProductsTab from '../../components/FinishedProductsTab/FinishedProductsTab';
import AddProductForm from '../../components/Forms/FinishedProductComponents/AddProductForm';
import { PackagingPanel } from '../Packaging/Packaging';
import BatchComponent from '../../components/BatchComponent/BatchComponent';

export default function FinishedProducts() {
  const [tab, setTab] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  const [finishedProducts, setFinishedProducts] = useState<BatchFinishedProduct[]>([]);

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
          <Tab label="Batch" />
          <Tab label="Products" />
          <Tab label="Add Product" />
        </Tabs>

        {tab === 0 && <FragrancesComponent />}

        {tab === 1 && (
          <section className={styles.content}>
            <IngredientsPanel />
          </section>
        )}

        {tab === 2 && (
          <section className={styles.content}>
            <PackagingPanel />
          </section>
        )}

        {tab === 3 && <BatchComponent />}

        {tab === 4 && (
          <FinishedProductsTab />
        )}
      
        {tab == 5 && <AddProductForm/>}
      </main>
    </div>
  );
}

