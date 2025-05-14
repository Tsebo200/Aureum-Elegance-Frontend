import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

function WarehouseTo() {
  const [location, setLocation] = React.useState<string>(''); // ensure string type

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="demo-simple-select-helper-label">Warehouse Selection</InputLabel>
      <Select
       sx={{borderRadius: 10, background: '#FFDBB1'}}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={location}
        label="Warehouse Selection"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Centurion">Centurion</MenuItem>
        <MenuItem value="CapeTown">Cape Town</MenuItem>
      </Select>
    </FormControl>
  );
}

export default WarehouseTo;
