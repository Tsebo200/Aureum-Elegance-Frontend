import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UserTextField({ value, onChange }: Props) {
  return (
    <Box component="div" sx={{ "& > :not(style)": { m: 0.1, minWidth: 250 } }}>
      <TextField
        id="outlined-basic"
        label="Enter User Id"
        variant="outlined"
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "#FFDBB1",
          },
        }}
      />
    </Box>
  );
}
