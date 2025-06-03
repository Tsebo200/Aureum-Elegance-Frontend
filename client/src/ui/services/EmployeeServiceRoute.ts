import type { User, Warehouse, StockRequest } from './models/employeeModel';

const API_URL = "http://localhost:5167/api/User";

// Server enum mapping (fallback only): Admin = 0, Manager = 1, Employee = 2
const roleMap = ['Admin', 'Manager', 'Employee'] as const;

function parseUser(u: any): User {
  // Determine roleValue either from a string or via the numeric fallback
  let roleValue: User['role'];
  if (typeof u.role === 'string') {
    // Backend already sends "Admin" | "Manager" | "Employee"
    roleValue = u.role as User['role'];
  } else {
    // Fallback: map numeric enum to string
    const idx = Number(u.role);
    roleValue = roleMap[idx] ?? 'Employee';
  }

  return {
    userId: u.userId,
    name: u.name,
    email: u.email,
    role: roleValue,
  };
}

export async function getEmployees(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  const users = await res.json();
  return users.map(parseUser);
}

export async function deleteUser(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete user with ID ${userId}`);
}

export async function promoteToManager(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/promote/${userId}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to promote user');
}

export async function removeManager(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/remove/${userId}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to remove manager');
}

export async function addEmployee(user: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  const created = await res.json();
  return parseUser(created);
}

export async function getWarehouses(): Promise<Warehouse[]> {
  const res = await fetch(`${API_URL.replace('/User', '')}/Warehouse`);
  if (!res.ok) throw new Error('Failed to fetch warehouses');
  return res.json();
}

export async function addWarehouse(w: Partial<Warehouse>): Promise<Warehouse> {
  const res = await fetch(`${API_URL.replace('/User', '')}/Warehouse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(w),
  });
  if (!res.ok) throw new Error('Failed to add warehouse');
  return res.json();
}

export async function getStockRequests(): Promise<StockRequest[]> {
  const res = await fetch(`${API_URL.replace('/User', '')}/StockRequest`);
  if (!res.ok) throw new Error('Failed to fetch stock requests');
  return res.json();
}

export async function respondToRequest(id: number, approve: boolean): Promise<void> {
  const res = await fetch(
    `${API_URL.replace('/User', '')}/StockRequest/${id}/${approve ? 'approve' : 'deny'}`,
    { method: 'PUT' }
  );
  if (!res.ok) throw new Error('Failed to respond to request');
}
