import type { FinishedProductDTO, PostFinishedProductPackaging } from "./models/finishedProductModel";

const BASE_URL = "http://localhost:5167/api/FinishedProduct";
const PACKAGING_URL = "http://localhost:5167/api/FinishedProductPackaging";

export async function getFinishedProducts(): Promise<FinishedProductDTO[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function deleteFinishedProduct(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete finished product");
  }
}

export async function addFinishedProduct(product: {
  productName: string;
  quantity: number;
  fragranceID: number;
}): Promise<{ productID: number }> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error("Failed to add finished product");

  return await res.json();
}

export async function addFinishedProductPackaging(
  packaging: PostFinishedProductPackaging
) {
  const res = await fetch(PACKAGING_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(packaging),
  });

  if (!res.ok) throw new Error("Failed to add packaging");

  return await res.json();
}
