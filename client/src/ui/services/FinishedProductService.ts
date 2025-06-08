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

export async function UpdateFinishedProduct(finishedProduct: {
  productID: number;
  productName: string;
  quantity: number;
  fragranceID: number;
}) {
  const response = await fetch(
    `http://localhost:5167/api/FinishedProduct/${finishedProduct.productID}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finishedProduct),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update finished product.");
  }

  // If status 204 No Content, return null or something
  if (response.status === 204) {
    return null;
  }

  // Otherwise parse JSON if present
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}


export async function UpdateFinishedProductPackaging(packaging: {
  ProductID: number;
  PackagingId: number;
  Amount: number;
}) {
  const PACKAGING_URL = "http://localhost:5167/api/FinishedProductPackaging";
  const response = await fetch(
    `${PACKAGING_URL}/${packaging.ProductID}/${packaging.PackagingId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packaging),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update finished product packaging.");
  }
}


