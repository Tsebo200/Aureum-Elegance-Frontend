import {
  Button,
  Checkbox,
  FilledInput,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  type SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FinishedProductComponent.module.scss";
import { getAllIngredients } from "../../../services/IngredientsServiceRoutes";
import type { Ingredient } from "../../../services/models/ingredientModel";
import type { PostFragrance } from "../../../services/models/fragranceModel";
import { addFragrance, addFragranceIngredient } from "../../../services/FragranceServiceRoute";
import { useLocation } from "react-router-dom";
interface SelectedIngredient {
  id: number;
  name: string;
  amount: number;
}

const ProducePerfumeForm = () => {
 
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    SelectedIngredient[]
  >([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    }
    fetchIngredients();
  }, []);

 

  
const handleIngredientSelectChange = (event: SelectChangeEvent) => {
  const selected = event.target.value as unknown as string[];

  const updatedIngredients = selected.map((name) => {
    const existing = selectedIngredients.find((i) => i.name === name);
    const matched = ingredients.find((i) => i.name === name);
    return {
      id: matched?.id ?? matched?.id ?? 0,
      name,
      amount: existing?.amount ?? 0,
    };
  });

  setSelectedIngredients(updatedIngredients);
};

  const handleAmountChange = (name: string, value: number) => {
    setSelectedIngredients((prev) =>
      prev.map((i) => (i.name === name ? { ...i, amount: Number(value) } : i))
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 12); // Set expiry one year ahead

    const fragrance: PostFragrance = {
      name,
      description,
      cost,
      volume,
      expiryDate: expiryDate.toISOString(),
    };

    try {
      const createdFragrance = await addFragrance(fragrance);

      await Promise.all(
        selectedIngredients.map((ingredient) =>
          addFragranceIngredient({
            fragranceID: createdFragrance.id,
            ingredientsID: ingredient.id,
            amount: ingredient.amount,
          })
        )
      );

      alert("Fragrance and ingredients created successfully.");
    } catch (error) {
      console.error("Error producing perfume:", error);
      alert("Failed to produce perfume.");
    }
  };

  return (
    <section className={styles.content}>
      <h1>Produce Perfume</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Name</label>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="..."
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="..."
            fullWidth
            multiline
            minRows={4}
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Cost Per Unit</label>
          <TextField
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            placeholder="..."
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Volume Per Bottle (in millilitres)</label>
          <TextField
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            placeholder="..."
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Expiry Date</label>
          <TextField
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            fullWidth
            variant="filled"
            InputProps={{ disableUnderline: true }}
          />
        </div>

        <div className={styles.field}>
          <label>Ingredients</label>
          <Select
            multiple
            value={selectedIngredients.map((i) => i.name)}
            onChange={handleIngredientSelectChange}
            input={<FilledInput disableUnderline fullWidth />}
            renderValue={(selected) => (selected as string[]).join(", ")}
            fullWidth
            variant="filled"
          >
            {ingredients.map((ingredient) => (
              <MenuItem key={ingredient.name} value={ingredient.name}>
                <Checkbox
                  checked={selectedIngredients.some(
                    (i) => i.name === ingredient.name
                  )}
                />
                <ListItemText primary={ingredient.name} />
              </MenuItem>
            ))}
          </Select>
        </div>

        {selectedIngredients.length > 0 && (
          <div className={styles.field}>
            <Typography variant="h6" gutterBottom>
              Selected Ingredients
            </Typography>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Ingredient</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Amount (ml)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedIngredients.map((ingredient) => (
                    <TableRow key={ingredient.name}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={ingredient.amount}
                          onChange={(e) =>
                            handleAmountChange(ingredient.name, +e.target.value)
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
        <Button
          variant="contained"
          className={styles.addBtn}
          type="submit"
          onClick={handleSubmit}
        >
          Produce Perfume
        </Button>
      </form>
    </section>
  );
};

export default ProducePerfumeForm;
