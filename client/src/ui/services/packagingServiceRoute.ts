import type { Packaging } from "./models/packagingModel";

export async function getAllPackagings(): Promise<Packaging[]> {
  const response = await fetch("http://localhost:5167/api/Packaging/");

  if (!response.ok) {
    throw new Error("Failed to fetch packaging data");
  }

  return response.json();
}
