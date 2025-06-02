import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import type { SelectChangeEvent } from '@mui/material';
import type { Ingredient } from "../../../services/models/ingredientModel";
import { getAllIngredients } from "../../../services/IngredientsServiceRoutes";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function IngredientSelect({ value, onChange }: Props) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await getAllIngredients();
        setIngredients(data);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="ingredient-select-label">Select Ingredient</InputLabel>
      <Select
        labelId="ingredient-select-label"
        value={value}
        onChange={handleChange}
        label="Select Ingredient"
        sx={{
          borderRadius: 10,
          background: "#FFDBB1",
        }}
      >
        {ingredients.map((ingredient) => (
          <MenuItem
            key={ingredient.id}
            value={ingredient.id.toString()}
          >
            {ingredient.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
