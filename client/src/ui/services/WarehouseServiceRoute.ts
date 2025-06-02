import type { Warehouse } from "./models/warehouseModel";


export async function getWarehouseById(id: number): Promise<Warehouse> {
  const response = await fetch(`http://localhost:5167/api/Warehouse/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch warehouse with ID ${id}`);
  }
  return response.json();
}
