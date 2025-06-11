import { getFinishedProducts, deleteFinishedProduct } from '../../../src/ui/services/FinishedProductService';
import type { FinishedProductDTO } from '../../../src/ui/services/models/finishedProductModel';

describe("FinishedProduct API Functionality", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getFinishedProducts should return a list of finished products", async () => {
    // Arrange
    const mockProducts: FinishedProductDTO[] = [
       {
    productID: 1,
    productName: "Product A",
    fragranceID: 1,
    fragrance: {
      id: 1,
      name: "Lavender",
      description: "A soothing lavender scent",
      cost: 10,
      expiryDate: "2026-01-01",
      volume: 100,
    },
    quantity: 100,
    finishedProductPackaging: [
      { 
        productID: 1,
        packagingId: 1,
        amount: 2,
        packaging: { 
          id: 1,
          name: "Box",
          stock: 50,
          type: "Container",
        }
      }
    ],
  },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    // Act
    const result = await getFinishedProducts();

    // Assert
    expect(result).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith("http://localhost:5167/api/FinishedProducts");
  });

  test("deleteFinishedProduct should call correct API endpoint", async () => {
    // Arrange
    const productIdToDelete = 1;
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    // Act
    await deleteFinishedProduct(productIdToDelete);

    // Assert
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5167/api/FinishedProducts/${productIdToDelete}`,
      { method: "DELETE" }
    );
  });

  test("getFinishedProducts should throw error on failure", async () => {
    // Arrange
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(getFinishedProducts()).rejects.toThrow("Failed to fetch finished products");
  });

  test("deleteFinishedProduct should throw error on failure", async () => {
    // Arrange
    const productIdToDelete = 99;
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    // Act & Assert
    await expect(deleteFinishedProduct(productIdToDelete)).rejects.toThrow("Failed to delete finished product");
  });
});
