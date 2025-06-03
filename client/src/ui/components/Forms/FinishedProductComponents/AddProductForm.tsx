import {
  Button,
  Checkbox,
  FilledInput,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FinishedProductComponent.module.scss";
import type { Packaging } from "../../../services/models/packagingModel";
import { getAllPackagings } from "../../../services/packagingServiceRoute";
import {
  addFinishedProduct,
  addFinishedProductPackaging,
} from "../../../services/FinishedProductService";
import type { Fragrance } from "../../../services/models/fragranceModel";
import { getFragrances } from "../../../services/FragranceServiceRoute";

interface SelectedPackaging {
  id: number;
  name: string;
  amount: number;
}

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [fragranceID, setFragranceID] = useState<number>(0);
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [selectedFragranceName, setSelectedFragranceName] = useState<string>("");


  const [packagings, setPackagings] = useState<Packaging[]>([]);
  const [selectedPackagings, setSelectedPackagings] = useState<
    SelectedPackaging[]
  >([]);

  useEffect(() => {
    async function fetchPackagings() {
      try {
        const data = await getAllPackagings();
        setPackagings(data);
      } catch (error) {
        console.error("Error fetching packagings:", error);
      }
    }
    async function fetchFragrances() {
      try {
        const data = await getFragrances();
        setFragrances(data);
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    }

    
    fetchPackagings();
    fetchFragrances();
  }, []);

  const handlePackagingSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];

    const updated = selected.map((name) => {
      const existing = selectedPackagings.find((p) => p.name === name);
      const match = packagings.find((p) => p.name === name);
      return {
        id: match?.id ?? 0,
        name,
        amount: existing?.amount ?? 0,
      };
    });

    setSelectedPackagings(updated);
  };

  const handleAmountChange = (name: string, value: number) => {
    setSelectedPackagings((prev) =>
      prev.map((p) => (p.name === name ? { ...p, amount: Number(value) } : p))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedFragrance = fragrances.find(
      (f) => f.name === selectedFragranceName
    );

    if (!productName || quantity <= 0 || !selectedFragrance) {
      alert("Please fill in all fields with valid values.");
      return;
    }


    try {
      const createdProduct = await addFinishedProduct({
        productName,
        quantity,
        fragranceID: selectedFragrance.id,
      });
      console.log("Created product:", createdProduct);
      await Promise.all(
        selectedPackagings.map((packaging) =>
          addFinishedProductPackaging({
            ProductID: createdProduct.productID,
            PackagingId: packaging.id,
            Amount: packaging.amount,
          })
        )
      );
      

      setProductName("");
      setQuantity(0);
      setFragranceID(0);
      setSelectedPackagings([]);
      alert("Finished product and packaging added successfully.");
    } catch (error) {
      console.error("Error adding finished product:", error);
      alert("Failed to add finished product.");
    }
  };
  

  return (
    <section className={styles.content}>
      <h1>Add Finished Product</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Product Name</label>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="..."
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Quantity</label>
          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="..."
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Fragrance</label>
          <Select
            value={selectedFragranceName}
            onChange={(e) => setSelectedFragranceName(e.target.value)}
            input={<FilledInput disableUnderline fullWidth />}
            fullWidth
            variant="filled"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a fragrance
            </MenuItem>
            {fragrances.map((fragrance) => (
              <MenuItem key={fragrance.id} value={fragrance.name}>
                {fragrance.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className={styles.field}>
          <label>Packaging Options</label>
          <Select
            multiple
            value={selectedPackagings.map((p) => p.name)}
            onChange={handlePackagingSelectChange}
            input={<FilledInput disableUnderline fullWidth />}
            renderValue={(selected) => (selected as string[]).join(", ")}
            fullWidth
            variant="filled"
          >
            {packagings.map((packaging) => (
              <MenuItem key={packaging.name} value={packaging.name}>
                <Checkbox
                  checked={selectedPackagings.some(
                    (p) => p.name === packaging.name
                  )}
                />
                <ListItemText primary={packaging.name} />
              </MenuItem>
            ))}
          </Select>
        </div>

        {selectedPackagings.length > 0 && (
          <div className={styles.field}>
            <Typography variant="h6" gutterBottom>
              Selected Packaging
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Packaging</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPackagings.map((packaging) => (
                    <TableRow key={packaging.name}>
                      <TableCell>{packaging.name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={packaging.amount}
                          onChange={(e) =>
                            handleAmountChange(packaging.name, +e.target.value)
                          }
                          variant="standard"
                          fullWidth
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        <br />
        <Button variant="contained" className={styles.addBtn} type="submit">
          Add Product
        </Button>
      </form>
    </section>
  );
};

export default AddProductForm;
