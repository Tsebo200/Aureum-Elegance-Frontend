import type { User, Warehouse, StockRequest } from './models/employeeModel';

const API_URL = "http://localhost:5167/api";

// Mapping backend role number to string
const roleMap = ['Admin', 'Manager', 'Employee'] as const;

// Helper to map user role enum
function parseUser(user: any): User {
  return {
    ...user,
    role: roleMap[user.role as number], // Converts 0 → 'Admin', etc.
  };
}

export async function getEmployees(): Promise<User[]> {
  const res = await fetch(`${API_URL}/User`);
  if (!res.ok) throw new Error('Failed to fetch users');
  const users = await res.json();
  return users.map(parseUser);
}

export async function promoteToManager(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/User/promote/${userId}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to promote user');
}

export async function removeManager(userId: number): Promise<void> {
  const res = await fetch(`${API_URL}/User/remove/${userId}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to remove manager');
}

export async function addEmployee(user: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/User`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  const createdUser = await res.json();
  return parseUser(createdUser);
}

export async function getWarehouses(): Promise<Warehouse[]> {
  const res = await fetch(`${API_URL}/Warehouse`);
  if (!res.ok) throw new Error('Failed to fetch warehouses');
  return res.json();
}

export async function addWarehouse(warehouse: Partial<Warehouse>): Promise<Warehouse> {
  const res = await fetch(`${API_URL}/Warehouse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(warehouse),
  });
  if (!res.ok) throw new Error('Failed to add warehouse');
  return res.json();
}

export async function getStockRequests(): Promise<StockRequest[]> {
  const res = await fetch(`${API_URL}/StockRequest`);
  if (!res.ok) throw new Error('Failed to fetch stock requests');
  return res.json();
}

export async function respondToRequest(id: number, approve: boolean): Promise<void> {
  const res = await fetch(`${API_URL}/StockRequest/${id}/${approve ? 'approve' : 'deny'}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to respond to request');
}
