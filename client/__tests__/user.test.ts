import { getUsers, addUser, deleteUser, addLoginUser } from '../src/ui/services/UserServiceRoute';
import type { UserRole } from '../src/ui/services/models/userModel';

describe("User API Functionality", () => {
  // Setup - run once before all tests
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  // Teardown - reset fetch mock after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getUsers should return a list of users", async () => {
    // Arrange
    const mockUsers = [
      { userId: 1, name: "John", email: "john@example.com", role: "Admin" },
      { userId: 2, name: "Jane", email: "jane@example.com", role: "Employee" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    // Act
    const result = await getUsers();

    // Assert
    expect(result).toEqual(mockUsers);
    expect(fetch).toHaveBeenCalledWith("http://localhost:5167/api/User/users");
  });

  test("addUser should send user data and return created user", async () => {
    // Arrange
    const newUser = {
      name: "Alice",
      email: "alice@example.com",
      role: "Manager" as UserRole,
      password: "secret123",
    };

    const createdUser = { userId: 3, ...newUser };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => createdUser,
    });

    // Act
    const result = await addUser(newUser);

    // Assert
    expect(result).toEqual(createdUser);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/User/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
    );
  });

  test("deleteUser should call correct API endpoint", async () => {
    // Arrange
    const userIdToDelete = 3;
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    // Act
    await deleteUser(userIdToDelete);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5167/api/User/users/${userIdToDelete}`,
      { method: "DELETE" }
    );
  });

  test("addLoginUser should send login data and return user", async () => {
    // Arrange
    const loginData = {
      name: "Alice",
      email: "alice@example.com",
      role: "Employee" as UserRole,
      password: "password123",
    };

    const loggedInUser = { userId: 3, ...loginData };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => loggedInUser,
    });

    // Act
    const result = await addLoginUser(loginData);

    // Assert
    expect(result).toEqual(loggedInUser);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/user/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })
    );
  });

  test("getUsers should throw error on failure", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(getUsers()).rejects.toThrow("Failed to fetch users");
  });

  test("addUser should throw error on failure", async () => {
    // Arrange
    const faultyUser = {
      name: "Fail",
      email: "fail@example.com",
      role: "Employee" as UserRole,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(addUser(faultyUser)).rejects.toThrow("Failed to create user");
  });
});
