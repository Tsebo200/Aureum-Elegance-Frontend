import { getFinishedProducts } from '../src/ui/services/BatchFinishedProductServiceRoute';
import type { BatchFinishedProduct } from '../src/ui/services/models/batchFinishedProductModel';

describe("Finished Products API Functionality", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getFinishedProducts should return a list of finished products", async () => {
    const mockProducts: BatchFinishedProduct[] = [
      {
        batchID: 1,
        productID: 101,
        quantity: 100,
        unit: "bottles",
        status: "Completed",
        warehouseID: 5,
      },
      {
        batchID: 2,
        productID: 102,
        quantity: 50,
        unit: "bottles",
        status: "InProgress",
        warehouseID: 3,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await getFinishedProducts();

    expect(result).toEqual(mockProducts);
    expect(fetch).toHaveBeenCalledWith("http://localhost:5167/api/BatchFinishedProduct");
  });

  test("getFinishedProducts should throw error when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getFinishedProducts()).rejects.toThrow("Failed to fetch finished products");
  });
});
