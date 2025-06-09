import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ItemType({ value, onChange }: Props) {
  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="item-type-label">Select Item Type</InputLabel>
      <Select
        aria-label="item type"
        labelId="item-type-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Select Item Type"
        sx={{ borderRadius: 10, background: "#FFF" }}>
        <MenuItem value="ingredient">Ingredient</MenuItem>
        <MenuItem value="packaging">Packaging</MenuItem>
        <MenuItem value="fragrance">Fragrance</MenuItem>
        {/* <MenuItem value="batchFinishedProduct">Batch Finished Product</MenuItem> */}
      </Select>
    </FormControl>
  );
}
