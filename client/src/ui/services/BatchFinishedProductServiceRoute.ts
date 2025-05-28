import type { BatchFinishedProduct } from "./models/batchFinishedProductModel";

const API_URL = "http://localhost:5167/api/BatchFinishedProduct";

export async function getFinishedProducts(): Promise<BatchFinishedProduct[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch finished products");
  }
  return await response.json();
}
