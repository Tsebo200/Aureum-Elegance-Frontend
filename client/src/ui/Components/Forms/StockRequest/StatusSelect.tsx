import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';


type Props = {
  value: string;
  onChange: (value: string) => void;
};

function StatusSelect({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="status-select-label">Status Selection</InputLabel>
      <Select
        sx={{ borderRadius: 10, background: '#FFDBB1' }}
        labelId="status-select-label"
        id="status-select"
        value={value}
        label="Status Selection"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </Select>
    </FormControl>
  );
}

export default StatusSelect;
