import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function RequestType({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="request-type-label">Request Type</InputLabel>
      <Select
        labelId="request-type-label"
        value={value}
        onChange={handleChange}
        label="Request Type"
        sx={{ borderRadius: 10, background: "#FFDBB1" }}
      >
        <MenuItem value="ingredient">Ingredient</MenuItem>
        <MenuItem value="packaging">Packaging</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RequestType;
