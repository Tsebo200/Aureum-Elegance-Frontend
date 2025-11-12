import React, { useEffect, useState } from 'react';
import styles from '../Suppliers/Suppliers.module.scss';
import { Tabs, Tab, TextField, Button, useMediaQuery } from '@mui/material';
import Sidebar from '../../Components/Sidebar';
import RecordLoss from '../../Components/Tabs/Record Loss/RecordLoss';
import WasteLossListComponent from '../../Components/WasteLossListComponent/WasteLossListComponent';
import { DeliverablesPanelStandalone } from '../StockManagement/Deliveries'
import { getSuppliers, addSupplier, deleteSupplier } from '../../services/SupplierServiceRoute';
import type { Supplier } from '../../services/models/supplierModel';

export default function Suppliers() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Form state
  const [supplierName, setSupplierName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, val: number) => setTab(val);

  const handleRemove = async (id: number, index: number) => {
    try {
      await deleteSupplier(id);
      const updated = [...suppliers];
      updated.splice(index, 1);
      setSuppliers(updated);
    } catch (error) {
      console.error(`Failed to delete supplier with ID ${id}:`, error);
      alert('There was an error deleting the supplier.');
    }
  };

  const handleAddSupplier = async () => {
    if (!supplierName.trim() || !contactPerson.trim() || !phoneNumber.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newSupplier: Supplier = {
      supplierName,
      contactPerson,
      phoneNumber,
      supplierID: 0
    };

    try {
      const added = await addSupplier(newSupplier);
      setSuppliers([...suppliers, added]); // Update UI with the new supplier
      setSupplierName('');
      setContactPerson('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Failed to add supplier:', error);
      alert("There was an error adding the supplier.");
    }
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
            <h1 className={styles.font}>Suppliers</h1>

            <div className={styles.list}>
              {suppliers.map((supplier, index) => (
                <div key={supplier.supplierID ?? index} className={styles.item}>
                  <span className={styles.name}>{supplier.supplierName}</span>
                  <span className={styles.contact}>{supplier.contactPerson}</span>
                  <span className={styles.phone}>{supplier.phoneNumber}</span>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(supplier.supplierID, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <h2 className={styles.font}>Add Supplier</h2>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSupplier();
              }}
            >
              <div className={styles.fieldsWrapper}>
                <div className={styles.field}>
                  <label>Supplier Name</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Contact Person</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label>Contact Number</label>
                  <TextField
                    placeholder="..."
                    fullWidth
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <Button type="submit" variant="contained" className={styles.addBtn}>
                  Add Supplier
                </Button>
              </div>
            </form>
          </section>
        )}

        {tab === 1 && (
          <section className={styles.content}>
            <DeliverablesPanelStandalone />
          </section>
        )}

        {tab === 2 && <WasteLossListComponent />}
        {tab === 3 && (
          <section className={styles.content}>
            <RecordLoss />
          </section>
        )}
      </main>
    </div>
  );
}
