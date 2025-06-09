import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import StockCard from "../../../src/ui/Components/AlertCards/StockCard/StockCard";
import { getFragrances } from "../../../src/ui/services/FragranceServiceRoute";
import type { Fragrance } from "../../../src/ui/services/models/fragranceModel";

// ✅ Mock the getFragrances service
jest.mock("../../../src/ui/services/FragranceServiceRoute", () => ({
  getFragrances: jest.fn(),
}));

describe("StockCard Component", () => {
  // ✅ Reset mocks after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the fragrance with the lowest volume", async () => {
    // Arrange - mock two fragrances with different volumes
    const mockFragrances: Fragrance[] = [
      {
        id: 1,
        name: "Lavender",
        description: "Calming lavender scent",
        expiryDate: "2025-11-30",
        cost: 20,
        volume: 200,
        fragranceIngredients: [],
      },
      {
        id: 2,
        name: "Mint",
        description: "Fresh mint",
        expiryDate: "2025-08-20",
        cost: 15,
        volume: 80, // Lowest volume
        fragranceIngredients: [],
      },
    ];

    (getFragrances as jest.Mock).mockResolvedValueOnce(mockFragrances);

    // Act
    render(<StockCard />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText("Lowest Stock")).toBeInTheDocument();
      expect(screen.getByText("Mint")).toBeInTheDocument(); // should show lowest volume name
    });
  });

  test("should display fallback message when no fragrance data is available", async () => {
    // Arrange
    (getFragrances as jest.Mock).mockResolvedValueOnce([]);

    // Act
    render(<StockCard />);

    // Assert
    await waitFor(() => {
      expect(
        screen.getByText("No fragrance data available.")
      ).toBeInTheDocument();
    });
  });

  test("should handle API failure gracefully", async () => {
    // Arrange
    (getFragrances as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    // Act
    render(<StockCard />);

    // Assert
    await waitFor(() => {
      expect(
        screen.getByText("No fragrance data available.")
      ).toBeInTheDocument();
    });
  });
});
