import {
  getAllIngredients,
  deleteIngredient,
  updateIngredient,
} from '../src/ui/services/IngredientsServiceRoutes';

describe("Ingredients API Functionality", () => {
  // Setup - mock fetch before all tests
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  // Teardown - reset fetch mock after each test to avoid test interference
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getAllIngredients should return a list of ingredients", async () => {
    // Arrange - prepare mock data to be returned by fetch
    const mockIngredients = [
      {
        id: 1,
        name: "Sugar",
        type: "Sweetener",
        cost: "10.00",
        expiryDate: "2025-12-31T00:00:00.000Z",
        isExpired: false,
      },
      {
        id: 2,
        name: "Salt",
        type: "Mineral",
        cost: "5.00",
        expiryDate: "2023-01-01T00:00:00.000Z",
        isExpired: true,
      },
    ];

    // Mock fetch to resolve with a successful response containing mockIngredients
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockIngredients,
    });

    // Act - call the API function
    const result = await getAllIngredients();

    // Assert - verify the returned data and the fetch call details
    expect(result).toEqual(mockIngredients);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/Ingredients/all"
    );
  });

  test("deleteIngredient should call correct API endpoint", async () => {
    // Arrange - set up ingredient ID to delete
    const ingredientId = 1;

    // Mock fetch to resolve with a successful deletion response
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    // Act - call the delete function
    await deleteIngredient(ingredientId);

    // Assert - verify the correct API endpoint and HTTP method was called
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5167/api/Ingredients/${ingredientId}`,
      { method: "DELETE" }
    );
  });

  test("updateIngredient should send data and return updated ingredient", async () => {
    // Arrange - prepare the payload for updating ingredient
    const updatePayload = {
      id: 1,
      name: "Sugar",
      type: "Sweetener",
      cost: "12.00",
      expiryDate: "2025-12-31T00:00:00.000Z",
      isExpired: false,
    };

    // Mock fetch to resolve with a successful response containing the updated ingredient
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatePayload,
    });

    // Act - call the update function
    const result = await updateIngredient(updatePayload);

    // Assert - check returned data and correct fetch call
    expect(result).toEqual(updatePayload);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/Ingredients/update",
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      })
    );
  });

  test("getAllIngredients should throw error on failure", async () => {
    // Arrange - mock fetch to simulate failed response
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert - expect the function to throw an error
    await expect(getAllIngredients()).rejects.toThrow("Failed to fetch ingredients");
  });

  test("deleteIngredient should throw error on failure", async () => {
    // Arrange - mock fetch to simulate failed delete response
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }), 
  });

    // Act & Assert - expect the function to throw an error when delete fails
    await expect(deleteIngredient(999)).rejects.toThrow("Failed to delete ingredient");
  });

  test("updateIngredient should throw error on failure", async () => {
    // Arrange - prepare invalid update payload and mock failure response
    const faultyPayload = {
      id: 999,
      name: "NonExistent",
      type: "Unknown",
      cost: "0",
      expiryDate: "2020-01-01T00:00:00.000Z",
      isExpired: true,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert - expect updateIngredient to throw error on failure
    await expect(updateIngredient(faultyPayload)).rejects.toThrow("Failed to update ingredient");
  });
});
