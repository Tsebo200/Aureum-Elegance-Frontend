import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields() {
  return (
    <Box 
      component="form"
      sx={{ '& > :not(style)': { m: 0, minWidth: 300, maxWidth: 300 }}} // Keeps it within desired width
      noValidate
      autoComplete="off"
    >
      <TextField 
        id="outlined-basic" 
        label="Enter Reason" 
        variant="outlined" 
        multiline
        rows={5} // Approx height of 140px
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            background: '#FFF',
            padding: 0,
            '& textarea': {
              padding: '16.5px 14px',
              textAlign: 'start',       // aligns left
              verticalAlign: 'top',     // ensures it's top-aligned
              resize: 'none',           // prevent resizing
              overflow: 'auto',         // handles overflow properly
            },
          },
        }}
      />
    </Box>
  );
}
