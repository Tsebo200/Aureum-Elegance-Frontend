export interface PostBatch{
    ProductionDate : string,
    BatchSize: number,
    Status: string
}

export interface Batch {
  batchID: number;
  productionDate: string;
  batchSize: number;
  status: string;
  batchFinishedProducts?: BatchFinishedProductInBatch[];
}

export interface BatchFinishedProductInBatch {
  productID: number;
  productName: string;
  quantity: number;
  unit: string;
  status: string;
  warehouseID: number;
}