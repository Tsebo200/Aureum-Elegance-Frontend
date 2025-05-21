import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './WasteLossListComponent.module.scss'
import { useState } from 'react';

const allWasteLosses = [
  {
    item: "Moonlit Jasmine",
    type: "Fragrance",
    quantity: 5,
    date: "2025-05-15",
    reason: "Expiry Reached",
    user: "Sarah",
  },
  {
    item: "Amber Bottle",
    type: "Packaging",
    quantity: 20,
    date: "2025-05-10",
    reason: "Damaged in Transit",
    user: "James",
  },
  {
    item: "Ocean Mist",
    type: "Finished Products",
    quantity: 10,
    date: "2025-05-12",
    reason: "Incorrect Label",
    user: "Emily",
  },
  {
    item: "Batch 102",
    type: "Batches",
    quantity: 1,
    date: "2025-05-18",
    reason: "Contamination",
    user: "Michael",
  },
  {
    item: "Lemon Extract",
    type: "Ingredients",
    quantity: 2,
    date: "2025-05-11",
    reason: "Spillage",
    user: "Anna",
  },
];

const WasteLossListComponent = () => {
  const [filter, setFilter] = useState("All");

  const filteredList =
    filter === "All"
      ? allWasteLosses
      : allWasteLosses.filter(
          (loss) => loss.type.toLowerCase() === filter.toLowerCase()
        );

  return (
    <section className={styles.content}>
      <h1>Waste Loss</h1>

      <FormControl
        fullWidth
        style={{ marginBottom: "20px" }}
        className={styles.form}
      >
        
        <div className={styles.field}>
          <label className={styles.label}>Filter by Type</label>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.select}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Fragrance">Fragrances</MenuItem>
            <MenuItem value="Packaging">Packaging</MenuItem>
            <MenuItem value="Finished Products">Finished Products</MenuItem>
            <MenuItem value="Batches">Batches</MenuItem>
            <MenuItem value="Ingredients">Ingredients</MenuItem>
          </Select>
        </div>
      </FormControl>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Type</th>
            <th>Quantity Lost</th>
            <th>Date of Loss</th>
            <th>Reason</th>
            <th>Recorded User</th>
            <th>Actions</th>
          </tr>
          <hr />
        </thead>
        <tbody>
          {filteredList.map((loss, index) => (
            <tr key={index}>
              <td>{loss.item}</td>
              <td>{loss.type}</td>
              <td>{loss.quantity}</td>
              <td>{loss.date}</td>
              <td>{loss.reason}</td>
              <td>{loss.user}</td>
              <td>
                <Button className={styles.Btn}>Edit</Button>
                <Button className={styles.Btn}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default WasteLossListComponent;
