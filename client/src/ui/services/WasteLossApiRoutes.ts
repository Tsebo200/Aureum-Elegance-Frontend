import type { GetWastelossFragrance, GetWastelossIngredient } from "./models/wasteLossModels";

export async function GetWastelossFragrances(): Promise<GetWastelossFragrance[]> {
  const response = await fetch("http://localhost:5167/api/WasteLossRecordFragrance");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function GetWastelossIngredients(): Promise<
  GetWastelossIngredient[]
> {
  const response = await fetch(
    "http://localhost:5167/api/WasteLossRecordIngredients"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
