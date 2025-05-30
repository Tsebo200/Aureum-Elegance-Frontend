// services/WarehouseServiceRoute.ts
import type { Warehouse } from "./models/warehouseModel";

// export async function getWarehouses(): Promise<Warehouse[]> {
//   const response = await fetch("http://localhost:5167/api/Warehouse/");
//   if (!response.ok) {
//     throw new Error("Failed to fetch warehouses");
//   }
//   return response.json();
// }

// export async function getWarehouses(id: number): Promise<Warehouse[]> {
//   const response = await fetch(`http://localhost:5167/api/Warehouse/${id}`, {
//     method: "GET",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to delete user");
//   }
// }

// services/WarehouseServiceRoute.ts

// services/WarehouseServiceRoute.ts

export async function getWarehouseById(id: number): Promise<Warehouse> {
  const response = await fetch(`http://localhost:5167/api/Warehouse/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch warehouse with ID ${id}`);
  }
  return response.json();
}
