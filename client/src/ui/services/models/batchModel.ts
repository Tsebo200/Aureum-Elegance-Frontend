export interface PostBatch{
    ProductionDate : string,
    BatchSize: number,
    Status: string
}

export interface Batch {
    BatchID: number,
    ProductionDate: string;
    BatchSize: number;
    Status: string;
    batchFinishedProductInBatch?: BatchFinishedProductInBatch[];
}

export interface BatchFinishedProductInBatch {
  batchID: number;
  productID: number;
  quantity: number;
  unit: string;
  status: string;
  warehouseID: number;
  ProductName: string;
}