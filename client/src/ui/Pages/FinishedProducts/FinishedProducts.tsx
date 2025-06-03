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

        {tab === 3 && <ProducePerfumeForm />}

        {tab === 4 && (
          <FinishedProductsTab />
          // <section className={styles.content}>
          //   <h1>Finished Products</h1>
          //   <table className={styles.table}>
          //     <thead>
          //       <tr>
          //         <th>Product ID</th>
          //         <th>Quantity</th>
          //         <th>Unit</th>
          //         <th>Status</th>
          //         <th>Batch ID</th>
          //         <th>Warehouse ID</th>
          //       </tr>
          //       <hr />
          //     </thead>
          //     <tbody>
          //       {finishedProducts.map((item) => (
          //         <tr key={`${item.batchID}-${item.productID}`}>
          //           <td>{item.productID}</td>
          //           <td>{item.quantity}</td>
          //           <td>{item.unit}</td>
          //           <td>{item.status}</td>
          //           <td>{item.batchID}</td>
          //           <td>{item.warehouseID}</td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </table>
          // </section>
        )}
      
        {tab == 5 && <AddProductForm/>}
      </main>
    </div>
  );
}

