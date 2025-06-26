import type { LoginDto, LoginResponseDto, User } from './models/userModel';

/* POST /api/user/login */
export async function addLoginUser(
  dto: LoginDto
): Promise<LoginResponseDto> {
  const res = await fetch('http://localhost:5167/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
}



// Get all Users
export async function getUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:5167/api/User/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// Add a new User
export async function addUser(user: Omit<User, "userId">): Promise<User> {
  const response = await fetch("http://localhost:5167/api/User/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) throw new Error("Failed to create user");

  return response.json();
}





// Delete a User
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`http://localhost:5167/api/User/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}

export const verifyTwoFactorCode = async (
  userId: number,
  code: string
) => {
  const r = await fetch('http://localhost:5167/api/twofactor/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, code })
  });
  if (!r.ok) throw new Error('2FA verify failed');
  return r.json();   // { valid: true/false }
};