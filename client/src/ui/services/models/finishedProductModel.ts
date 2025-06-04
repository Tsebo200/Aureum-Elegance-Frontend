export interface PackagingInfo {
  id: number;
  name: string;
  type?: string;
  stock: number;
}

export interface FinishedProductPackaging {
  productID: number;
  packagingId: number;
  amount: number;
  packaging?: PackagingInfo;
}
export interface PostFinishedProductPackaging {
  ProductID: number;
  PackagingId: number;
  Amount: number;
}
export interface Fragrance {
  id: number;
  name: string;
  description: string;
  cost: number;
  expiryDate: string;
  volume: number;
}

export interface FinishedProductDTO {
  productID: number;
  fragranceID: number;
  productName?: string;
  quantity: number;
  finishedProductPackaging?: FinishedProductPackaging[];
  fragrance?: Fragrance;
}

export interface PostFinishedProductDTO {
  productID: number;
  fragranceID: number;
  productName?: string;
  quantity: number;

}

