import type { Supplier } from "./models/supplierModel";

const API_URL = "http://localhost:5167/api/Supplier";

// Fetch all suppliers
export async function getSuppliers(): Promise<Supplier[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch suppliers");
  }
  return await response.json();
}

// Add a new supplier
export async function addSupplier(supplier: Supplier): Promise<Supplier> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplier),
  });

  if (!response.ok) {
    throw new Error("Failed to add supplier");
  }

  return await response.json();
}
