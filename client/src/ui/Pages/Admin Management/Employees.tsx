import { useEffect, useState, useMemo } from 'react';
import styles from './Employees.module.scss';
import { Tabs, Tab, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';
import StockRequestAdmin from '../../Components/StockRequestAdmin/StockRequestAdmin';
import {
  getEmployees,
  promoteToManager,
  removeManager,
  deleteUser,
  getWarehouses,
  addWarehouse,
  addEmployee,
} from '../../services/EmployeeServiceRoute';
import type { User, Warehouse } from '../../services/models/employeeModel';

export default function Employees() {
  // Role Guard: only Admins can see this page
  const storedRole = localStorage.getItem('role'); 
  if (storedRole !== 'Admin') {
    return null;
  }

  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loadingWarehouses, setLoadingWarehouses] = useState(true);

  // New employee form state
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeEmail, setNewEmployeeEmail] = useState('');
  const [newEmployeePassword, setNewEmployeePassword] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState<'Employee' | 'Manager' | ''>('');

  // New warehouse form state
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

  // Enrich warehouses with full manager objects
  const warehousesWithManagers = useMemo(() => {
    return warehouses.map(w => ({
      ...w,
      assignedManager: w.assignedManagerUserId != null
        ? allUsers.find(u => u.userId === w.assignedManagerUserId)
        : undefined,
    }));
  }, [warehouses, allUsers]);

  // Build manager → warehouse lookup
  const managerWarehouseMap = useMemo(() => {
    const map: Record<number, string> = {};
    warehousesWithManagers.forEach(w => {
      if (w.assignedManager) {
        map[w.assignedManager.userId] = w.name;
      }
    });
    return map;
  }, [warehousesWithManagers]);

  // Promote / Demote
  const handlePromote = async (userId: number) => {
    try {
      await promoteToManager(userId);
      await loadEmployees();
    } catch {
      alert('Could not promote employee. Please try again.');
    }
  };

  const handleRemove = async (userId: number) => {
    try {
      await removeManager(userId);
      await loadEmployees();
    } catch {
      alert('Could not remove manager. Please try again.');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      await loadEmployees();
    } catch {
      alert('Could not delete user. Please try again.');
    }
  };

  // Add warehouse
  const handleAddWarehouse = async () => {
    if (!newWarehouseName.trim()) {
      alert('Please enter a warehouse name.');
      return;
    }
    try {
      await addWarehouse({
        name: newWarehouseName.trim(),
        assignedManagerUserId:
          selectedManagerId === '' ? undefined : selectedManagerId,
      });
      setNewWarehouseName('');
      setSelectedManagerId('');
      await loadWarehouses();
    } catch {
      alert('Failed to add warehouse.');
    }
  };

  // Add employee (Email instead of warehouse)
  const handleAddEmployee = async () => {
    if (!newEmployeeName.trim()) {
      alert('Please enter the employee name.');
      return;
    }
    if (!newEmployeeEmail.trim()) {
      alert('Please enter the employee email.');
      return;
    }
    if (!newEmployeePassword.trim()) {
      alert('Please enter a temporary password.');
      return;
    }
    if (newEmployeeRole === '') {
      alert('Please select a role.');
      return;
    }

    try {
      await addEmployee({
        name: newEmployeeName.trim(),
        email: newEmployeeEmail.trim(),
        password: newEmployeePassword,
        role: newEmployeeRole,
      });
      // Clear form fields
      setNewEmployeeName('');
      setNewEmployeeEmail('');
      setNewEmployeePassword('');
      setNewEmployeeRole('');
      await loadEmployees();
      alert('Employee added successfully!');
      setTab(0); // Switch back to Employees tab
    } catch {
      alert('Failed to add employee. Please try again.');
    }
  };

  // Split managers vs employees
  const managers = allUsers.filter(u => u.role === 'Manager');
  const employees = allUsers.filter(u => u.role === 'Employee');

  const displayName = (u: User) => u.name?.trim() || u.email || 'Unknown';

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

        {/* Employees Tab */}
        {tab === 0 && (
          <section className={styles.content}>
            <h2>Managers</h2>
            {loadingEmployees ? (
              <p>Loading…</p>
            ) : managers.length > 0 ? (
              <div className={styles.list}>
                {managers.map(m => (
                  <div key={m.userId} className={styles.item}>
                    <div className={styles.employeeInfo}>
                      <span className={styles.name}>{displayName(m)}</span>
                      <span className={styles.warehouse}>
                        {managerWarehouseMap[m.userId] ?? 'No warehouse'}
                      </span>
                    </div>
                    <Button
                      variant="contained"
                      className={styles.addBtn}
                      onClick={() => handleRemove(m.userId)}
                    >
                      Remove Manager
                    </Button>
                    <Button
                      variant="contained"
                      className={styles.addBtn}
                      onClick={() => handleDeleteUser(m.userId)}
                      style={{ marginLeft: '1rem' }}
                    >
                      Delete Account
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No managers found.</p>
            )}

            <h2>Employees</h2>
            {!loadingEmployees && employees.length === 0 && <p>No employees.</p>}
            <div className={styles.list}>
              {employees.map(e => (
                <div key={e.userId} className={styles.item}>
                  <span className={styles.name}>{displayName(e)}</span>
                  <Button
                    variant="contained"
                    className={styles.addBtn}
                    onClick={() => handlePromote(e.userId)}
                  >
                    Promote to Manager
                  </Button>
                  <Button
                    variant="contained"
                    className={styles.addBtn}
                    onClick={() => handleDeleteUser(e.userId)}
                    style={{ marginLeft: '1rem' }}
                  >
                    Delete Account
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Add Employee Tab */}
        {tab === 1 && (
          <section className={styles.content}>
            <div className={styles.formRow}>
              <div className={styles.flex1}>
                <label className={styles.label}>Name</label>
                <input
                  value={newEmployeeName}
                  onChange={e => setNewEmployeeName(e.target.value)}
                  placeholder="Employee name"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.flex1}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  value={newEmployeeEmail}
                  onChange={e => setNewEmployeeEmail(e.target.value)}
                  placeholder="Employee email"
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.flex1}>
                <label className={styles.label}>Temporary Password</label>
                <input
                  type="password"
                  value={newEmployeePassword}
                  onChange={e => setNewEmployeePassword(e.target.value)}
                  placeholder="Temporary password"
                  className={styles.inputField}
                />
              </div>
              <div className={styles.flex1}>
                <label className={styles.label}>Role</label>
                <select
                  className={styles.selectField}
                  value={newEmployeeRole}
                  onChange={e =>
                    setNewEmployeeRole(
                      e.target.value === 'Manager' || e.target.value === 'Employee'
                        ? (e.target.value as 'Manager' | 'Employee')
                        : ''
                    )
                  }
                >
                  <option value="">Role Selection</option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <Button
              variant="contained"
              className={styles.addBtn}
              onClick={handleAddEmployee}
            >
              Add Employee
            </Button>
          </section>
        )}

        {/* Warehouses Tab */}
        {tab === 2 && (
          <section className={styles.content}>
            <h2>Warehouses</h2>
            {loadingWarehouses ? (
              <p>Loading warehouses…</p>
            ) : warehousesWithManagers.length > 0 ? (
              <div className={styles.list}>
                {warehousesWithManagers.map((wh) => (
                  <div key={wh.warehouseID} className={styles.item}>
                    <div className={styles.employeeInfo}>
                      <span className={styles.name}>{wh.name}</span>
                      <span className={styles.warehouse}>
                        {wh.assignedManager
                          ? displayName(wh.assignedManager)
                          : 'No manager'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No warehouses found.</p>
            )}

            <h2 style={{ marginTop: '2rem' }}>Add Warehouse</h2>
            <div className={styles.formRowAddWarehouse}>
              <div className={styles.flex1}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={newWarehouseName}
                  onChange={(e) => setNewWarehouseName(e.target.value)}
                  placeholder="Warehouse name…"
                />
              </div>
              <div className={styles.flex1}>
                <label className={styles.label}>Manager</label>
                <select
                  className={styles.selectField}
                  value={selectedManagerId}
                  onChange={(e) =>
                    setSelectedManagerId(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                >
                  <option value="">None</option>
                  {managers.map((m) => (
                    <option key={m.userId} value={m.userId}>
                      {displayName(m)}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="contained"
                className={styles.addBtn}
                onClick={handleAddWarehouse}
              >
                Add Warehouse
              </Button>
            </div>
          </section>
        )}

        {/* Stock Request Tab */}
        {tab === 3 && <StockRequestAdmin />}
      </main>
    </div>
  );
}
