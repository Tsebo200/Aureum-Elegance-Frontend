import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import type { SelectChangeEvent } from '@mui/material';
import type { Packaging } from "../../../services/models/packagingModel";
import { getAllPackagings } from "../../../services/packagingServiceRoute";


type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PackagingsSelect({ value, onChange }: Props) {
  const [ packagings, setPackagings] = useState<Packaging[]>([]);

  useEffect(() => {
    const fetchPackagings = async () => {
      try {
        const data = await getAllPackagings();
        setPackagings(data);
      } catch (error) {
        console.error("Failed to fetch Packagings:", error);
      }
    };

    fetchPackagings();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="ingredient-select-label">Select Packaging</InputLabel>
      <Select
        labelId="packaging-select-label"
        value={value}
        onChange={handleChange}
        label="Select Packaging"
        sx={{
          borderRadius: 10,
          background: "#FFDBB1",
        }}
      >
        {packagings.map((packaging) => (
          <MenuItem
            key={packaging.id}
            value={packaging.id.toString()}
          >
            {packaging.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
