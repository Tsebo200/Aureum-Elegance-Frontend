import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem } from '@mui/material';
import styles from '../../Pages/Admin Management/Employees.module.scss';

import type {
  StockRequestAdminDTO,
  StockRequestType
} from '../../services/models/stockRequestAdminModel';
import {
  getStockRequests,
  respondToRequest
} from '../../services/StockRequestAdminServiceRoute';

export default function StockRequestAdmin() {
  const [mode, setMode] = useState<StockRequestType>('Ingredients');
  const [requests, setRequests] = useState<StockRequestAdminDTO[]>([]);

  // Fetch whenever the mode changes
  useEffect(() => {
    getStockRequests(mode)
      .then(setRequests)
      .catch(err => console.error('Failed to load requests:', err));
  }, [mode]);

  // Approve or deny, then re-fetch
  const handleResponse = (id: number, approve: boolean) => {
    respondToRequest(mode, id, approve)
      .then(() => getStockRequests(mode).then(setRequests))
      .catch(err => console.error('Failed to respond to request:', err));
  };

  return (
    <section className={styles.content}>
      <h2>Stock Requests</h2>

      {/* Mode selector */}
      <div style={{ margin: '1rem 0' }}>
        <Select
          value={mode}
          onChange={e => setMode(e.target.value as StockRequestType)}
        >
          <MenuItem value="Ingredients">Ingredients</MenuItem>
          <MenuItem value="Packagings">Packagings</MenuItem>
        </Select>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span>Name</span>
          <span>Requested Amount</span>
          <span>Warehouse</span>
          <span>Action</span>
        </div>
        <hr className={styles.hr} />

        {requests.map(r => (
          <div className={styles.tableRow} key={r.id}>
            <span>
              {r.requestType === 'Ingredients'
                ? r.ingredients?.name
                : r.packaging?.name}
            </span>
            <span>{r.amountRequested}</span>
            <span>{r.warehouse?.name}</span>
            <span className={styles.actionBtns}>
              <Button
                className={styles.approveBtn}
                onClick={() => handleResponse(r.id, true)}
              >
                Approve
              </Button>
              <Button
                className={styles.denyBtn}
                onClick={() => handleResponse(r.id, false)}
              >
                Reject
              </Button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
