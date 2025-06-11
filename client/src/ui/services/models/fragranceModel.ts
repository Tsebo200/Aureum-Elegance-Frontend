export interface Ingredient {
  name: string;
  type: string;
  cost: number;
  expiryDate: string;
}

export interface FragranceIngredient {
  fragranceID: number;
  ingredientsID: number;
  amount: number;
  ingredients: Ingredient[];
}

export interface Fragrance {
  id: number;
  name: string;
  description: string;
  cost: number;
  expiryDate: string;
  volume: number;
  fragranceIngredients: FragranceIngredient[];
}

export interface PostFragranceIngredient {
  fragranceID: number;
  ingredientsID: number;
  Amount: number;
  
}
export interface PostFragrance {
  name: string;
  description: string;
  cost: number;
  expiryDate: string;
  volume: number;
}
