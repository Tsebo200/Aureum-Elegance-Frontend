import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Suppliers.module.scss';
import sidenavStyles from './Sidenav.module.scss';
import Logo from '../../assets/Logo.png';
import { Button, TextField, Tabs, Tab, useMediaQuery } from '@mui/material';

export default function Suppliers() {
  const [tab, setTab] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleTabChange = (e, val) => setTab(val);

  return (
    <div className={styles.container}>
      <aside className={sidenavStyles.sidenav}>
        <img src={Logo} alt="Logo" className={sidenavStyles.logo} />
        <ul className={sidenavStyles.nav}>
          {['Dashboard','Production','Stock Request','Add Stock','Warehouse Stock','User Management','Stock Management']
            .map(item => <li key={item}>{item}</li>)}
        </ul>
      </aside>

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
              <div className={styles.field}>
                <label>Supplier Name</label>
                <TextField placeholder="..." fullWidth variant="filled" />
              </div>
              <div className={styles.field}>
                <label>Contact Person</label>
                <TextField placeholder="..." fullWidth variant="filled" />
              </div>
              <div className={styles.field}>
                <label>Contact Number</label>
                <TextField placeholder="..." fullWidth variant="filled" />
              </div>
              <Button variant="contained" className={styles.addBtn}>
                Add Supplier
              </Button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
