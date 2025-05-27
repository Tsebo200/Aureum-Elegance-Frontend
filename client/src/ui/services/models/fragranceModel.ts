export interface Ingredient {
  name: string;
  type: string;
  cost: number;
  expiryDate: string;
}

export interface FragranceIngredient {
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
