import { getAllPackaging, deletePackaging, updatePackaging} from "../src/ui/services/packagingServiceRoute";
import type { Packaging, PostPackaging } from "../src/ui/services/models/packagingModel";

describe("Packaging API Functionality", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getAllPackaging should return a list of packaging items", async () => {
    const mockPackaging: Packaging[] = [
      { id: 1, name: "Box", type: "Cardboard", stock: 100 },
      { id: 2, name: "Bottle", type: "Plastic", stock: 200 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPackaging,
    });

    const result = await getAllPackaging();

    expect(result).toEqual(mockPackaging);
    expect(fetch).toHaveBeenCalledWith("http://localhost:5167/api/Packaging");
  });

  test("deletePackaging should call correct API endpoint", async () => {
    const packagingId = 5;

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    await deletePackaging(packagingId);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5167/api/Packaging/${packagingId}`,
      { method: "DELETE" }
    );
  });

  test("updatePackaging should send update data and return success", async () => {
    const packagingId = 3;
    const updateData: PostPackaging = {
      name: "Updated Box",
      type: "Plastic",
      stock: 150,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    await updatePackaging(packagingId, updateData);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5167/api/Packaging/${packagingId}`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
    );
  });

  test("getAllPackaging should throw error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getAllPackaging()).rejects.toThrow("Failed to fetch packaging");
  });

  test("deletePackaging should throw error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(deletePackaging(1)).rejects.toThrow("Failed to delete packaging");
  });

  test("updatePackaging should throw error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(updatePackaging(1, { name: "Test", type: "Test", stock: 10 })).rejects.toThrow("Failed to update packaging");
  });
});
