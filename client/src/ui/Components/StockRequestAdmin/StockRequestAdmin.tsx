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
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    getStockRequests(mode)
      .then(setRequests)
      .catch(err => console.error('Failed to load requests:', err));
  }, [mode]);

  const handleResponse = (id: number, approve: boolean) => {
    respondToRequest(mode, id, approve)
      .then(() => getStockRequests(mode).then(setRequests))
      .catch(err => console.error('Failed to respond to request:', err));
  };

  // Apply status filter before display
  const filteredRequests =
    statusFilter === 'All'
      ? requests
      : requests.filter(r => r.status === statusFilter);

  return (
    <section className={styles.content}>
      <h2 className={styles.headingTitle}>Stock Requests</h2>

      {/* Filters */}
      <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem' }}>
        {/* Type Filter (Ingredients / Packagings) */}
        <Select
          value={mode}
          onChange={e => setMode(e.target.value as StockRequestType)}
        >
          <MenuItem value="Ingredients">Ingredients</MenuItem>
          <MenuItem value="Packagings">Packagings</MenuItem>
        </Select>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span className={styles.headingTitle}>Name</span>
          <span className={styles.headingTitle}>Requested Amount</span>
          <span className={styles.headingTitle}>Warehouse</span>
          <span className={styles.headingTitle}>Action</span>
        </div>
        <hr className={styles.hr} />

        {filteredRequests.map(r => (
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
                disabled={r.status !== 'Pending'}
              >
                Approve
              </Button>
              <Button
                className={styles.denyBtn}
                onClick={() => handleResponse(r.id, false)}
                disabled={r.status !== 'Pending'}
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
