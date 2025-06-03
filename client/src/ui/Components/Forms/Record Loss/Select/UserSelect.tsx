import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import type { SelectChangeEvent } from '@mui/material';
import type { User } from "../../../../services/models/userModel";
import { getUsers } from "../../../../services/UserServiceRoute";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UserSelect({ value, onChange }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0.1, minWidth: 250 }}>
      <InputLabel id="user-select-label">Select User</InputLabel>
      <Select
        labelId="user-select-label"
        value={value}
        onChange={handleChange}
        label="Select User"
        sx={{
          borderRadius: 10,
          background: "#FFF",
        }}
      >
        {users.map((user) => (
          <MenuItem key={user.userId} value={user.userId.toString()}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
