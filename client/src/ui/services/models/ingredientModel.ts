export interface Ingredient {
    id: number;
  name: string;
  type: string;
  cost: number;
  expiryDate: string;
  isExpired: boolean;
}

// Shape for creating or updating an Ingredient
export interface PostIngredient {
  name: string;
  type: string;
  cost: string;
  expiryDate: string;  // send as ISO 8601 string, e.g. "2025-12-31T00:00:00Z"
  isExpired: boolean;
}

