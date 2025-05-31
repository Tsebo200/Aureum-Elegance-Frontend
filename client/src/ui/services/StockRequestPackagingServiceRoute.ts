import type { StockRequestPackaging } from "./models/stockRequestPackagingModel.ts";

// Get all StockRequestPackagings
export async function getStockRequestPackagings(): Promise<StockRequestPackaging[]> {
  const response = await fetch("http://localhost:5167/api/StockRequestPackagings");
  if (!response.ok) {
    throw new Error("Failed to fetch Stock Request Packagings");
  }
  return response.json();
}

// Add a new StockRequestPackaging
export async function addStockRequestPackaging(
  stockRequest: Omit<StockRequestPackaging, "id">
): Promise<StockRequestPackaging> {
  const response = await fetch("http://localhost:5167/api/StockRequestPackagings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stockRequest),
  });

  if (!response.ok) throw new Error("Failed to create Stock Request Packaging");

  return response.json();
}

// Update a StockRequestPackaging
export async function updateStockRequestPackaging(
  id: number,
  stockRequest: Omit<StockRequestPackaging, "id">
): Promise<void> {
  const response = await fetch(`http://localhost:5167/api/StockRequestPackagings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stockRequest),
  });

  if (!response.ok) throw new Error("Failed to update Stock Request Packaging");
}

// Delete a StockRequestPackaging
export async function deleteStockRequestPackaging(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5167/api/StockRequestPackagings/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Stock Request Packaging");
  }
}
