import React from 'react';
import styles from './Employees.module.scss';
import { Tabs, Tab, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';

export default function Employees() {
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
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
        >
          <Tab label="Employees" />
          <Tab label="Add Employee" />
          <Tab label="Warehouses" />
          <Tab label="Stock Requests" />
        </Tabs>

        {tab === 0 && (
          <section className={styles.content}>
            <h2>Managers</h2>

            <div className={styles.list}>
              <div className={styles.item}>
                <div className={styles.employeeInfo}>
                  <span className={styles.name}>Ivan</span>
                  <span className={styles.warehouse}>Warehouse 1</span>
                </div>
                <Button variant="contained" className={styles.addBtn}>
                  Remove Manager
                </Button>
              </div>
              <div className={styles.item}>
                <div className={styles.employeeInfo}>
                  <span className={styles.name}>Annabelle</span>
                  <span className={styles.warehouse}>Warehouse 2</span>
                </div>
                <Button variant="contained" className={styles.addBtn}>
                  Remove Manager
                </Button>
              </div>
            </div>

            <h2>Employees</h2>

            <div className={styles.list}>
              <div className={styles.item}>
                <span className={styles.name}>Alice Byers</span>
                <Button variant="contained" className={styles.addBtn}>
                  Promote to Manager
                </Button>
              </div>
              <div className={styles.item}>
                <span className={styles.name}>Sasha Devon</span>
                <Button variant="contained" className={styles.addBtn}>
                  Promote to Manager
                </Button>
              </div>
              <div className={styles.item}>
                <span className={styles.name}>Micheal Reese</span>
                <Button variant="contained" className={styles.addBtn}>
                  Promote to Manager
                </Button>
              </div>
            </div>
          </section>
        )}

        {tab === 1 && (
          <section className={styles.content}>
            <div className={styles.formRow}>
              <div className={styles.flex1}>
                <label className={styles.label}>Name</label>
                <input placeholder="..." className={styles.inputField} />
              </div>

              <div className={styles.flex1}>
                <label className={styles.label}>Temporary Password</label>
                <input placeholder="..." className={styles.inputField} />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.flex1}>
                <label className={styles.label}>Warehouse</label>
                <select className={styles.selectField}>
                  <option>Warehouse Selection</option>
                </select>
              </div>

              <div className={styles.flex1}>
                <label className={styles.label}>Role</label>
                <select className={styles.selectField}>
                  <option>Role Selection</option>
                </select>
              </div>
            </div>

            <Button variant="contained" className={styles.addBtn}>
              Add Employee
            </Button>
          </section>
        )}

        {tab === 2 && (
          <section className={styles.content}>
            <h2>Warehouses</h2>

            <div style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
              <div style={{ marginBottom: '0.8rem' }}>Warehouse 1</div>
              <div>Warehouse 2</div>
            </div>

            <h2 style={{ marginTop: '3rem' }}>Add Warehouse</h2>

            <div className={styles.formRowAddWarehouse}>
              <div className={styles.flex1}>
                <label className={styles.label}>Name</label>
                <input placeholder="..." className={styles.inputField} />
              </div>

              <div className={styles.flex1}>
                <label className={styles.label}>Manager</label>
                <select className={styles.selectField}>
                  <option>Manager Selection</option>
                </select>
              </div>

              <Button variant="contained" className={styles.addBtn}>
                Add Warehouse
              </Button>
            </div>
          </section>
        )}

        {tab === 3 && (
      <section className={styles.content}>
        <h2>Stock Requests</h2>

        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span>Name</span>
            <span>Requested Amount</span>
            <span>Warehouse To</span>
            <span>Warehouse From</span>
            <span>Action</span>
          </div>
          <hr className={styles.hr} />

          <div className={styles.tableRow}>
            <span>Bergamot Oil</span>
            <span>100 kg</span>
            <span>1</span>
            <span>2</span>
            <span className={styles.actionBtns}>
              <Button className={styles.approveBtn}>Approve</Button>
              <Button className={styles.denyBtn}>Deny</Button>
            </span>
          </div>
        </div>
      </section>
       )}

      </main>
    </div>
  );
}
