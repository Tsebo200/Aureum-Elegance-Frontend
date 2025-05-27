import type { Fragrance, PostFragrance, PostFragranceIngredient } from "./models/fragranceModel";


export async function getFragrances(): Promise<Fragrance> {
  
  const response = await fetch("http://localhost:5167/api/Fragrance");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function addFragrance(fragrance: PostFragrance) {
  const response = await fetch("http://localhost:5167/api/Fragrance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fragrance),
  });

  if (!response.ok) throw new Error("Failed to create fragrance");

  return response.json(); 
}

export async function addFragranceIngredient(
  ingredient: PostFragranceIngredient
) {
  const response = await fetch(
    "http://localhost:5167/api/FragranceIngredients",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ingredient),
    }
  );

  if (!response.ok) throw new Error("Failed to add fragrance ingredient");

  return response.json();
}

export const updateFragrance = async (id: number, fragrance: PostFragrance) => {
  const response = await fetch(`/api/Fragrance/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fragrance),
  });
  if (!response.ok) throw new Error("Failed to update fragrance.");
};

export const updateFragranceIngredient = async (
  fragranceID: number,
  ingredientsID: number,
  data: { fragranceID: number; ingredientsID: number; amount: number }
) => {
  const response = await fetch(
    `/api/Fragrance/${fragranceID}/${ingredientsID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to update fragrance ingredient.");
};

export async function deleteFragrance(id: number) {
  const response = await fetch(`http://localhost:5167/api/Fragrance/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete fragrance");
  }
}
