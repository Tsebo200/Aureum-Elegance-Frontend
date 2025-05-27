import React, { useEffect, useState } from 'react';
import styles from './Employees.module.scss';
import { Tabs, Tab, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';
import { getEmployees,promoteToManager,removeManager,} from '../../services/EmployeeServiceRoute';
import type { User } from '../../services/models/employeeModel';

export default function Employees() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  const loadEmployees = async () => {
    try {
      const users = await getEmployees();
      setAllUsers(users);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (userId: number) => {
    await promoteToManager(userId);
    await loadEmployees();
  };

  const handleRemove = async (userId: number) => {
    await removeManager(userId);
    await loadEmployees(); 
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const managers = allUsers.filter((u) => u.role === 'Manager');
  const employees = allUsers.filter((u) => u.role === 'Employee');

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

          {loading ? (
            <p>Loading...</p>
          ) : managers.length > 0 ? (
            <div className={styles.list}>
              {managers.map((manager) => (
                <div key={manager.userId} className={styles.item}>
                  <div className={styles.employeeInfo}>
                    <span className={styles.name}>{manager.name ?? 'No Name'}</span>
                    <span className={styles.warehouse}>Warehouse TBD</span>
                  </div>
                  <Button
                    variant="contained"
                    className={styles.addBtn}
                    onClick={() => handleRemove(manager.userId)}
                  >
                    Remove Manager
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No managers found.</p>
          )}

          <h2>Employees</h2>

          {!loading && employees.length === 0 && <p>No employees found.</p>}

          <div className={styles.list}>
            {employees.map((emp) => (
              <div key={emp.userId} className={styles.item}>
                <span className={styles.name}>{emp.name ?? 'No Name'}</span>
                <Button
                  variant="contained"
                  className={styles.addBtn}
                  onClick={() => handlePromote(emp.userId)}
                >
                  Promote to Manager
                </Button>
              </div>
            ))}
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
