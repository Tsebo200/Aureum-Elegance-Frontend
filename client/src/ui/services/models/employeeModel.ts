// User Role Type
export type UserRole = 'Admin' | 'Manager' | 'Employee';

// User Model
export interface User {
  userId: number;        // matches DTO.UserId
  name: string;
  email: string;
  role: UserRole;
  password?: string;     // optional: only for creation
}

// Warehouse Model
export interface Warehouse {
  warehouseID: number;
  name: string;
  location: string;
  assignedManagerUserId?: number;
  assignedManager?: User;
}

// Stock Request Model
export interface StockRequest {
  id: number;
  amountRequested: number;
  status: string;
  requestDate: string;
  ingredientsId: number;
  userId?: number;
  user?: User;

  warehouseFromId: number;
  warehouseFrom?: Warehouse;

  warehouseToId: number;
  warehouseTo?: Warehouse;
}
