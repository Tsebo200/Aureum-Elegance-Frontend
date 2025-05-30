// Common bits
export interface UserDTO {
  userId: number;
  name: string;
  role: string;
}
export interface WarehouseDTO {
  warehouseID: number;
  name: string;
  location: string;
}

export type StockRequestType = 'Ingredients' | 'Packagings';

export interface BaseStockRequestDTO {
  id: number;
  amountRequested: number;
  status: string;
  requestDate: string;
  user?: UserDTO;
  warehouse?: WarehouseDTO;
}

// Ingredient-specific details
export interface IngredientDTO {
  id: number;
  name: string;
  type: string;
  cost: number;
  isExpired: boolean;
}

// Packaging-specific details
export interface PackagingDTO {
  id: number;
  name: string;
  type: string;
  stock: number;
}

// Discriminated union: each request is either Ingredients or Packagings
export type StockRequestAdminDTO =
  | (BaseStockRequestDTO & {
      requestType: 'Ingredients';
      ingredients: IngredientDTO;
      packaging?: never;
    })
  | (BaseStockRequestDTO & {
      requestType: 'Packagings';
      packaging: PackagingDTO;
      ingredients?: never;
    });
