import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

function StatusSelect() {
  const [status, setStatus] = React.useState<string>(''); // ensure string type

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="demo-simple-select-helper-label">Status Selection</InputLabel>
      <Select
       sx={{borderRadius: 10, background: '#FFDBB1'}}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={status}
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
