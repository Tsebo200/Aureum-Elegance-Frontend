// Represents a Delivery item as returned by the API
export interface Delivery {
  deliveryID: number;
  supplierID: number;
  deliveryDateArrived: string;   // ISO string
  deliveryDateOrdered: string;   // ISO string
  deliveryCost: number;
  warehouseID: number;
}

// For creating or updating a Delivery
export interface PostDelivery {
  deliveryID?: number;           // optional on create
  supplierID: number;
  deliveryDateArrived: string;   // ISO string
  deliveryDateOrdered: string;   // ISO string
  deliveryCost: number;
  warehouseID: number;
}
