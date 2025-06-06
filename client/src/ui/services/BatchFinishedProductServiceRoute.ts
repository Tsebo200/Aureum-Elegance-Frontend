import type { BatchFinishedProduct, PostBatchFinishedProduct } from "./models/batchFinishedProductModel";
import type { Batch, PostBatch } from "./models/batchModel";

const API_URL = "http://localhost:5167/api/BatchFinishedProduct";

export async function getFinishedProducts(): Promise<BatchFinishedProduct[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch finished products");
  }
  return await response.json();
}

export async function addBatch(batch: PostBatch) {
  const response = await fetch("http://localhost:5167/api/Batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batch),
  });

  if (!response.ok) throw new Error("Failed to create Batch");

  return response.json(); 
}

export async function addBatchFinishedProduct(batchFinishedProduct: PostBatchFinishedProduct) {
  const response = await fetch("http://localhost:5167/api/BatchFinishedProduct", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(batchFinishedProduct),
  });

  if (!response.ok) throw new Error("Failed to create Batch");

  if (!response.ok) throw new Error("Failed to create BatchFinishedProduct");

  // Prevent error when no JSON body is returned
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}


export async function getBatch(): Promise<Batch[]> {
  const response = await fetch("http://localhost:5167/api/Batch");
  if (!response.ok) {
    throw new Error("Failed to fetch Batch");
  }
  return await response.json();
}