import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  itemType: string;
  value: string;
  onChange: (value: string) => void;
};

interface Item {
  id: number;
  name: string;
}

export default function RecordItem({ itemType, value, onChange }: Props) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response;
        switch (itemType) {
          case "ingredient":
            response = await fetch("http://localhost:5167/api/Ingredients/all");
            break;
          case "packaging":
            response = await fetch("http://localhost:5167/api/Packaging");
            break;
          case "fragrance":
            response = await fetch("http://localhost:5167/api/Fragrance");
            break;
            case "batchFinishedProduct":
            response = await fetch("http://localhost:5167/api/BatchFinishedProduct");
            break;
            default:
            setItems([]);
            return;
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };

    if (itemType) fetchItems();
  }, [itemType]);

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="item-select-label">Select Item</InputLabel>
      <Select
        labelId="item-select-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Select Item"
        sx={{ borderRadius: 10, background: "#FFF" }}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id.toString()}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
