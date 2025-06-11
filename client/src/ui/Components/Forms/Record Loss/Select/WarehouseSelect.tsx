import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { getWarehouseById } from "../../../../services/WarehouseServiceRoute";
import type { Warehouse } from "../../../../services/models/warehouseModel";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function WarehouseSelect({ value, onChange }: Props) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const [wh1, wh2] = await Promise.all([
          getWarehouseById(1),
          getWarehouseById(2),
        ]);
        setWarehouses([wh1, wh2]);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      sx={{
        "& > *": { m: 0.1, minWidth: 250 },
      }}
    >
      <InputLabel id="warehouse-select-label">Select Warehouse</InputLabel>
      <Select
        aria-label="warehouse"
        labelId="warehouse-select-label"
        value={value}
        onChange={handleChange}
        label="Select Warehouse"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            background: "#FFF",
          },
          borderRadius: 10,
          background: "#FFF",
        }}
      >
        {warehouses.map((wh) => (
          <MenuItem key={wh.warehouseID} value={wh.warehouseID.toString()}>
            {wh.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
