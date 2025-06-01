import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function QuantityForm({ value, onChange }: Props) {
  return (
    <Box 
      component="form"
      sx={{ '& > :not(style)': { m: 0, minWidth: 300} }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Enter Quantity" 
      variant="outlined" 
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ '& .MuiOutlinedInput-root':{borderRadius: 10, background: '#FFF',  height: 60}}}/>
    </Box> // Adding '& .MuiOutlinedInput-root': before sx helps specify where(class) to add the styling 
    // Apply these styles to the element inside the current component that has the class MuiOutlinedInput-root
  );
}