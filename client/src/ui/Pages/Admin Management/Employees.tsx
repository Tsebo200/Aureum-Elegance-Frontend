import React, { useEffect, useState } from 'react';
import styles from './Employees.module.scss';
import { Tabs, Tab, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';
import {
  getEmployees,
  promoteToManager,
  removeManager,
  getWarehouses,
  addWarehouse,
} from '../../services/EmployeeServiceRoute';
import type { User, Warehouse } from '../../services/models/employeeModel';

export default function Employees() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  // Employees state
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  // Warehouses state for tab 3
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(true);

  // Form state for adding warehouse
  const [newWarehouseName, setNewWarehouseName] = useState('');
  const [selectedManagerId, setSelectedManagerId] = useState<number | ''>('');

  // Load employees
  const loadEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const users = await getEmployees();
      setAllUsers(users);
    } catch (err) {
      console.error('Failed to load employees:', err);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Load warehouses
  const loadWarehouses = async () => {
    setLoadingWarehouses(true);
    try {
      const data = await getWarehouses();
      setWarehouses(data);
    } catch (err) {
      console.error('Failed to load warehouses:', err);
    } finally {
      setLoadingWarehouses(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    loadWarehouses();
  }, []);

  // Promote and remove manager handlers
  const handlePromote = async (userId: number) => {
    await promoteToManager(userId);
    await loadEmployees();
  };

  const handleRemove = async (userId: number) => {
    await removeManager(userId);
    await loadEmployees();
  };

  // Add warehouse handler
  const handleAddWarehouse = async () => {
    if (!newWarehouseName.trim()) {
      alert('Please enter a warehouse name.');
      return;
    }

    try {
      await addWarehouse({
        name: newWarehouseName.trim(),
        assignedManagerUserId: selectedManagerId === '' ? undefined : selectedManagerId,
      });
      setNewWarehouseName('');
      setSelectedManagerId('');
      await loadWarehouses();
    } catch (err) {
      console.error('Failed to add warehouse:', err);
      alert('Failed to add warehouse.');
    }
  };

  const managers = allUsers.filter((u) => u.role === 'Manager');
  const employees = allUsers.filter((u) => u.role === 'Employee');

  const displayName = (user: User) => user.name?.trim() || user.email || 'Unknown User';

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <Tabs
          value={tab}
          onChange={(_e, val) => setTab(val)}
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

            {loadingEmployees ? (
              <p>Loading...</p>
            ) : managers.length > 0 ? (
              <div className={styles.list}>
                {managers.map((manager) => (
                  <div key={manager.userId} className={styles.item}>
                    <div className={styles.employeeInfo}>
                      <span className={styles.name}>{displayName(manager)}</span>
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

            {!loadingEmployees && employees.length === 0 && <p>No employees found.</p>}

            <div className={styles.list}>
              {employees.map((emp) => (
                <div key={emp.userId} className={styles.item}>
                  <span className={styles.name}>{displayName(emp)}</span>
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

            {loadingWarehouses ? (
              <p>Loading warehouses...</p>
            ) : warehouses.length > 0 ? (
              <div className={styles.list}>
                {warehouses.map((wh) => (
                  <div key={wh.warehouseID} className={styles.item}>
                    <div className={styles.employeeInfo}>
                      <span className={styles.name}>{wh.name}</span>
                      <span className={styles.warehouse}>
                        {wh.assignedManager
                          ? displayName(wh.assignedManager)
                          : 'No manager assigned'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No warehouses found.</p>
            )}

            <h2 style={{ marginTop: '3rem' }}>Add Warehouse</h2>

            <div className={styles.formRowAddWarehouse}>
              <div className={styles.flex1}>
                <label className={styles.label}>Name</label>
                <input
                  placeholder="Warehouse Name..."
                  className={styles.inputField}
                  value={newWarehouseName}
                  onChange={(e) => setNewWarehouseName(e.target.value)}
                />
              </div>

              <div className={styles.flex1}>
                <label className={styles.label}>Manager</label>
                <select
                  className={styles.selectField}
                  value={selectedManagerId}
                  onChange={(e) =>
                    setSelectedManagerId(e.target.value === '' ? '' : Number(e.target.value))
                  }
                >
                  <option value="">Manager Selection</option>
                  {managers.map((m) => (
                    <option key={m.userId} value={m.userId}>
                      {displayName(m)}
                    </option>
                  ))}
                </select>
              </div>

              <Button variant="contained" className={styles.addBtn} onClick={handleAddWarehouse}>
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
