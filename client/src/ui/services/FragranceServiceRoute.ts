import type { Fragrance } from "./models/fragranceModel";
// export const getFragrances = async (): Promise<Fragrance[]> => {
//   const response = await fetch("http://localhost:5167/api/Fragrance");

//   if (!response.ok) {
//     throw new Error("Failed to fetch fragrances");
//   }

//   return await response.json();
// };

export async function getFragrances(): Promise<Fragrance> {
  
  const response = await fetch("http://localhost:5167/api/Fragrance");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
