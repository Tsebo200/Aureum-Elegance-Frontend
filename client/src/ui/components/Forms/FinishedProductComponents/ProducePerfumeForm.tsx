import { Button, Checkbox, FilledInput, ListItemText, MenuItem, OutlinedInput, Select, TextField, type SelectChangeEvent } from "@mui/material"
import React from "react"
import styles from './FinishedProductComponent.module.scss'



  const ingredients = [
    "Rose Essence",
    "Lavender Oil",
    "Vanilla",
    "Sandalwood",
    "Citrus Extract",
    "Musk",
  ];
const ProducePerfumeForm = () =>{
    const [selectedIngredients, setSelectIngredients] = React.useState<string[]>([]);

    const handleIngredientChange = (event: SelectChangeEvent<typeof ingredients>) => {
      const {
        target: { value },
      } = event;
      setSelectIngredients(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    }
    return (
      <section className={styles.content}>
        <h1>Produce Perfume</h1>
        <form className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <TextField
              placeholder="..."
              fullWidth
              variant="filled"
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div className={styles.field}>
            <label>Description</label>
            <TextField
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
              placeholder="..."
              fullWidth
              variant="filled"
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div className={styles.field}>
            <label>Volume Per Bottle (in millilitres)</label>
            <TextField
              placeholder="..."
              fullWidth
              variant="filled"
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div className={styles.field}>
            <label id="ingredient-select-label">Ingredients</label>
            <Select
              labelId="ingredient-select-label"
              multiple
              value={selectedIngredients}
              onChange={handleIngredientChange}
              input={<FilledInput disableUnderline fullWidth />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              fullWidth
              variant="filled"
            >
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient} value={ingredient}>
                  <Checkbox
                    checked={selectedIngredients.includes(ingredient)}
                  />
                  <ListItemText primary={ingredient} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <br />
          <Button variant="contained" className={styles.addBtn}>
            Produce Perfume
          </Button>
        </form>
      </section>
    );

              

}
export default ProducePerfumeForm