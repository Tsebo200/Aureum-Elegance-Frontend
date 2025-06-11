import type { GetWastelossBatchFinishedProduct, GetWastelossFragrance, GetWastelossIngredient, GetWastelossPackaging } from "./models/wasteLossModels";

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

export async function GetWastelossPackagings(): Promise<
  GetWastelossPackaging[]
> {
  const res = await fetch("http://localhost:5167/api/WasteLossRecordPackaging");
  if (!res.ok) throw new Error("API error " + res.status);
  return res.json();
}

export async function GetWastelossBatchFinished(): Promise<
  GetWastelossBatchFinishedProduct[]
> {
  const res = await fetch(
    "http://localhost:5167/api/WasteLossRecordBatchFinishedProducts"
  );
  if (!res.ok) throw new Error("API error " + res.status);
  return res.json();
}
