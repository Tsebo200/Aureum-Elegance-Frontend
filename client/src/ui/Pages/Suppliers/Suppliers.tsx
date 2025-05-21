import React, { useState } from 'react';
import styles from '../Suppliers/Suppliers.module.scss';
import { Tabs, Tab, TextField, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';
import RecordLoss from '../../Components/Tabs/Record Loss/RecordLoss';
import WasteLossListComponent from '../../Components/WasteLossListComponent/WasteLossListComponent';
import {DeliveriesPanel} from '../StockManagement/SMDeliveries';

export default function Suppliers() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [suppliers, setSuppliers] = useState([
    { name: "Isaac's Fragrances", contact: "Alice", phone: "012 463 8396" },
    { name: 'Marie Packagings', contact: 'Micheal', phone: '012 567 6014' },
  ]);

  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  const handleRemove = (index: number) => {
    const updated = [...suppliers];
    updated.splice(index, 1);
    setSuppliers(updated);
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          className={styles.tabs}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
        >
          <Tab label="Suppliers" />
          <Tab label="Deliveries" />
          <Tab label="Waste Loss" />
          <Tab label="Record Loss" />
        </Tabs>

        {tab === 0 && (
          <section className={styles.content}>
            <h1>Suppliers</h1>

            <div className={styles.list}>
              {suppliers.map((supplier, index) => (
                <div key={index} className={styles.item}>
                  <span className={styles.name}>{supplier.name}</span>
                  <span className={styles.contact}>{supplier.contact}</span>
                  <span className={styles.phone}>{supplier.phone}</span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <h2>Add Supplier</h2>
            <form className={styles.form}>
              <div className={styles.fieldsWrapper}>
                <div className={styles.field}>
                  <label>Supplier Name</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                  />
                </div>
                <div className={styles.field}>
                  <label>Contact Person</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                  />
                </div>
                <div className={styles.field}>
                  <label>Contact Number</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                  />
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <Button variant="contained" className={styles.addBtn}>
                  Add Supplier
                </Button>
              </div>
            </form>
          </section>
        )}

        {tab === 1 && (
          <section className={styles.content}>
            <DeliveriesPanel />
          </section>
        )}

        {tab === 2 && (
          <WasteLossListComponent />
        )}


        {tab === 3 && (
          <section className={styles.content}>
            <RecordLoss />
          </section>
        )}
      </main>
    </div>
  );
}
