import { addIngredient } from "../src/ui/services/IngredientsServiceRoutes";
import { addPackaging } from "../src/ui/services/packagingServiceRoute";
import type { PostIngredient } from "../src/ui/services/models/ingredientModel";
import type { PostPackaging } from "../src/ui/services/models/packagingModel";


describe("Add Stock API Functionality", () => {
  // Setup - Mock the fetch function before all tests
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  // Teardown - Reset fetch after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("addIngredient should successfully create an ingredient", async () => {
    // Arrange
    const mockIngredient: PostIngredient = {
      name: "Lemon Extract",
      type: "Liquid",
      cost: "23.50",
      expiryDate: new Date().toISOString(),
      isExpired: false,
    };

    const createdIngredient = { ...mockIngredient, id: 1 };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => createdIngredient,
    });

    // Act
    const result = await addIngredient(mockIngredient);

    // Assert
    expect(result).toEqual(createdIngredient);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/Ingredients/create",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockIngredient),
      })
    );
  });

  test("addIngredient should throw error when request fails", async () => {
    // Arrange
    const faultyIngredient: PostIngredient = {
      name: "Expired Oil",
      type: "Oil",
      cost: "10.00",
      expiryDate: new Date().toISOString(),
      isExpired: true,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(addIngredient(faultyIngredient)).rejects.toThrow("Failed to create ingredient");
});

  test("addPackaging should successfully add packaging", async () => {
    // Arrange
    const mockPackaging: PostPackaging = {
      name: "Plastic Bottle",
      type: "Container",
      stock: 300,
    };

    const createdPackaging = { ...mockPackaging, id: 1 };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => createdPackaging,
    });

    // Act
    const result = await addPackaging(mockPackaging);

    // Assert
    expect(result).toEqual(createdPackaging);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5167/api/Packaging",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockPackaging),
      })
    );
  });

  test("addPackaging should throw error when request fails", async () => {
    // Arrange
    const faultyPackaging: PostPackaging = {
      name: "Broken Jar",
      type: "Glass",
      stock: 0,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(addPackaging(faultyPackaging)).rejects.toThrow("Failed to create packaging");

  });
});
