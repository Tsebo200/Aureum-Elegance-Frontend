// models/userModel.ts

export type UserRole = 'Admin' | 'Manager' | 'Employee';

export interface User {
  userId: number;
  name: string;
  email: string;
  role: UserRole;
  password?: string;          // only present on create/register
  is2faEnabled?: boolean;     // <-- OPTIONAL boolean, never a literal
  // secret?: string;         // keep server-side; only send back if you really must
}

/** DTO you POST when logging in */
export interface LoginDto {
  email: string;
  password: string;
  role: UserRole;             // you’re sending "Employee"
}

/** Shape the API sends back after login */
export interface LoginResponseDto {
  userId: number;
  role: UserRole;
  is2faEnabled: boolean;
  // add other fields if backend returns them
}
