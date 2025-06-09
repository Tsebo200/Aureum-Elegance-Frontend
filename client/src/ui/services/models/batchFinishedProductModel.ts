export interface BatchFinishedProduct {
  batchID: number;
  productID: number;
  quantity: number;
  unit: string;
  status: string;
  warehouseID: number;
  batchInBatchFinishedProduct:  BatchInBatchFinishedProduct;
  
}

export interface PostBatchFinishedProduct {
  batchID: number;
  productID: number;
  quantity: number;
  unit: string;
  status: string;
  warehouseID: number;
}

export interface BatchInBatchFinishedProduct {
  ProductionDate: string;
  BatchSize: number;
  Status: string;
}

export interface FinishedProductInBatchFinishedProduct{
  ProductID: number;
   ProductName: string;
   FragranceID: number,
   Quantity: number,
}