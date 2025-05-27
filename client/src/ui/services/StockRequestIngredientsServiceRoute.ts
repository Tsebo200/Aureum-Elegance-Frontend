import type { StockRequestIngredients } from "./models/stockRequestIngredientsModel";

// Get all StockRequestIngredients
export async function getStockRequestIngredients(): Promise<StockRequestIngredients[]> {
  const response = await fetch("http://localhost:5167/api/StockRequestIngredients");
  if (!response.ok) {
    throw new Error("Failed to fetch Stock Request Ingredients");
  }
  return response.json();
}

// Add a new StockRequestIngredient
export async function addStockRequestIngredient(
  stockRequest: Omit<StockRequestIngredients, "id">
): Promise<StockRequestIngredients> {
  const response = await fetch("http://localhost:5167/api/StockRequestIngredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stockRequest),
  });

  if (!response.ok) throw new Error("Failed to create Stock Request Ingredient");

  return response.json();
}

// Update a StockRequestIngredient
export async function updateStockRequestIngredient(
  id: number,
  stockRequest: Omit<StockRequestIngredients, "id">
): Promise<void> {
  const response = await fetch(`http://localhost:5167/api/StockRequestIngredients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stockRequest),
  });

  if (!response.ok) throw new Error("Failed to update Stock Request Ingredient");
}

// Delete a StockRequestIngredient
export async function deleteStockRequestIngredient(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5167/api/StockRequestIngredients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Stock Request Ingredient");
  }
}
