export interface BatchFinishedProduct {
  batchID: number;
  productID: number;
  quantity: number;
  unit: string;
  status: string;
  warehouseID: number;
}
