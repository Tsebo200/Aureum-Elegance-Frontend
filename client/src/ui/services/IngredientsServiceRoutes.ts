

import type { Ingredient } from "./models/ingredientModel";

export async function getAllIngredients(): Promise<Ingredient[]> {
  const response = await fetch("http://localhost:5167/api/Ingredients/all");

  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return response.json();
}
