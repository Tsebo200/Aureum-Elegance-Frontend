import type { Packaging, PostPackaging } from "./models/packagingModel";

// Base URL of your backend Packaging controller
const BASE_URL = "http://localhost:5167/api/Packaging";

/**
 * GET all packaging items
 * GET: api/Packaging
 */
export async function getAllPackaging(): Promise<Packaging[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch packaging list");
  }
  return res.json();
}

/**
 * GET one packaging item by ID
 * GET: api/Packaging/{id}
 */
export async function getPackagingById(id: number): Promise<Packaging> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch packaging with id ${id}`);
  }
  return res.json();
}

/**
 * POST create new packaging
 * POST: api/Packaging
 */
export async function addPackaging(
  payload: PostPackaging
): Promise<Packaging> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create packaging");
  }
  return res.json();
}

/**
 * PUT update existing packaging
 * PUT: api/Packaging/{id}
 */
export async function updatePackaging(
  id: number,
  payload: PostPackaging
): Promise<Packaging> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update packaging with id ${id}`);
  }
  return res.json();
}

/**
 * DELETE a packaging item
 * DELETE: api/Packaging/{id}
 */
export async function deletePackaging(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to delete packaging with id ${id}`);
  }
}
