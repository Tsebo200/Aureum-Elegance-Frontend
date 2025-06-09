export interface GetWastelossFragrance {
  id: number;
  quantityLoss: number;
  reason: string;
  dateOfLoss: string;

  fragrance?: {
    id: number;
    name: string;
    description: string;
    cost: number;
    expiryDate: string;
    volume: number;
  };

  user?: {
    userId: number;
    name: string;
    role: string;
  };

  warehouse?: {
    warehouseID: number;
    name: string;
    location: string;
  };
}
export interface GetWastelossIngredient {
  id: number;
  quantityLoss: number;
  reason: string;
  dateOfLoss: string;

  Ingredients?: {
    IngredientsId: number;
    name: string;
    type: string;
    cost: number;
    expiryDate: string;
    isExpired: boolean;
  };

  user?: {
    userId: number;
    name: string;
    role: string;
  };

  warehouse?: {
    warehouseID: number;
    name: string;
    location: string;
  };
}
export interface GetWastelossPackaging {
  id: number;
  quantityLoss: number;
  reason: string;
  dateOfLoss: string;

  Packaging?: {
    packagingId: number;
    name: string;
    type: string;
    cost: number;
    expiryDate: string;
    isExpired: boolean;
  };

  user?: {
    userId: number;
    name: string;
    role: string;
  };

  warehouse?: {
    warehouseID: number;
    name: string;
    location: string;
  };
}

export interface GetWastelossPackaging {
  id: number;
  quantityLoss: number;
  reason: string;
  dateOfLoss: string;
  packaging?: {
    packagingId: number;
    name: string;
    type: string;
    cost: number;
    expiryDate: string;
    isExpired: boolean;
  };
  user?: { userId: number; name: string; role: string };
  warehouse?: { warehouseID: number; name: string; location: string };
}


export interface GetWastelossBatchFinishedProduct {
  id: number;
  quantityLoss: number;
  reason: string;
  dateOfLoss: string;
  finishedProduct?: {
    ProductID: number;
    FragranceID: number;
    ProductName: string;
    Quantity: number;
  };
  batch?: {
    BatchID: number;
    ProductionDate: string;
    BatchSize: number;
  };
  user?: { userId: number; name: string; role: string };
  warehouse?: { warehouseID: number; name: string; location: string };
}

