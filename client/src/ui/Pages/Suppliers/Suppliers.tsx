import React from 'react';
import styles from '../Suppliers/Suppliers.module.scss';
import { Tabs, Tab, TextField, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';

export default function Suppliers() {
  const [tab, setTab] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

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
          <Tab label="Suppliers" />
          <Tab label="Deliveries" />
          <Tab label="Waste Loss" />
          <Tab label="Record Loss" />
        </Tabs>

        {tab === 0 && (
          <section className={styles.content}>
            <h1>Suppliers</h1>

            <div className={styles.list}>
              <div className={styles.item}>
                <span className={styles.name}>Isaac's Fragrances</span>
                <span className={styles.contact}>Alice</span>
                <span className={styles.phone}>012 463 8393</span>
              </div>
              <div className={styles.item}>
                <span className={styles.name}>Marie Packagings</span>
                <span className={styles.contact}>Micheal</span>
                <span className={styles.phone}>012 567 6014</span>
              </div>
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

        {tab === 2 && (
          <section className={styles.content}>
            <h1>Waste Loss</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Quantity Lost</th>
                  <th>Date of Loss</th>
                  <th>Reason</th>
                  <th>Recorded User</th>
                </tr>
                <hr />
              </thead>
              <tbody>
                <tr>
                  <td>Moonlit Jasmine</td>
                  <td>Fragrance</td>
                  <td>5</td>
                  <td>15/05/2025</td>
                  <td>Expiry Reached</td>
                  <td>Sarah</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}


        {tab === 3 && (
          <section className={styles.content}>
            <h1>Record Loss</h1>
                  <div className={styles.mainContainer}>
                    <div className={styles.top}>
                      <div className={styles.itemBox}>
                        <h2 className={styles.itemHeading}>Item</h2>
                        <div className={styles.itemForm}></div>
                      </div>
                      <div className={styles.quantityBox}>
                        <h2 className={styles.quantityHeading}>Quantity Lost</h2>
                        <div className={styles.quantityForm}></div>
                      </div>
                      <div className={styles.dateBox}>
                        <h2 className={styles.dateHeading}>Date of Loss</h2>
                        <div className={styles.dateForm}></div>
                      </div>
                    </div>
                    <div className={styles.bottom}>
                      <div className={styles.itemTypeBox}>
                        <h2 className={styles.itemTypeHeading}>Item Type</h2>
                        <div className={styles.itemTypeForm}></div>
                      </div>
                      <div className={styles.reasonBox}>
                        <h2 className={styles.reasonHeading}>Reason</h2>
                        <div className={styles.reasonForm}></div>
                      </div>
                      <div className={styles.recordBtn}>
                        <h3 className={styles.recordBtnText}>Record Waste Loss</h3>
                      </div>
                    </div>
                  </div>
          </section>
        )}
      </main>
    </div>
  );
}
