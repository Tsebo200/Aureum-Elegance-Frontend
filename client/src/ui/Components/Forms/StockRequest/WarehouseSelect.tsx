import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

function WarehouseTo() {
  const [age, setAge] = React.useState<string>(''); // ensure string type

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="demo-simple-select-helper-label">Warehouse Selection</InputLabel>
      <Select
       sx={{borderRadius: 10, background: '#FFDBB1'}}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={age}
        label="Warehouse Selection"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="10">Centurion</MenuItem>
        <MenuItem value="20">CapeTown</MenuItem>
      </Select>
      {/* <FormHelperText>With label + helper text</FormHelperText> */}
    </FormControl>
  );
}

export default WarehouseTo;
