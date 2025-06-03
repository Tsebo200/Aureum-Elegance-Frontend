import type { Ingredient, PostIngredient } from "./models/ingredientModel";

// Base URL of your backend API (adjust port/deployment URL as needed)
const BASE_URL = "http://localhost:5167/api/Ingredients";

// GET: api/Ingredients/all
export async function getAllIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch ingredients");
  }
  return res.json();
}

// GET: api/Ingredients/name/{ingredientName}
export async function getIngredientByName(
  name: string
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ingredient "${name}"`);
  }
  return res.json();
}

// GET: api/Ingredients/type/{ingredientType}
export async function getIngredientByType(
  type: string
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/type/${encodeURIComponent(type)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ingredients of type "${type}"`);
  }
  return res.json();
}

// GET: api/Ingredients/cost/{ingredientCost}
export async function getIngredientByCost(
  cost: string
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/cost/${encodeURIComponent(cost)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ingredients with cost "${cost}"`);
  }
  return res.json();
}

// GET: api/Ingredients/expired/{isExpired}
export async function getIngredientsByExpired(
  isExpired: boolean
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/expired/${isExpired}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ingredients where expired is "${isExpired}"`
    );
  }
  return res.json();
}

// POST: api/Ingredients/create
export async function addIngredient(
  payload: PostIngredient
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create ingredient");
  }
  return res.json();
}

// PUT: api/Ingredients/update
export async function updateIngredient(
  payload: PostIngredient & { id: number }
): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to update ingredient with id ${payload.id}`);
  }
  return res.json();
}

// DELETE: api/Ingredients/delete/{ingredientId}
export async function deleteIngredient(id: number): Promise<Ingredient> {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete ingredient with id ${id}`);
  }
  return res.json();
}
