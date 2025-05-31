// User Role Type
export type UserRole = 'Admin' | 'Manager' | 'Employee';

// User Model
export interface User {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  password?: string; // optional: for creation only, not included in fetches
}
