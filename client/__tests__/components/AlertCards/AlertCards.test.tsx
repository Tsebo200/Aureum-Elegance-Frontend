import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ExpiryDate from "../../../src/ui/Components/AlertCards/ExpiryDate/ExpiryDate";
import { getFragrances } from "../../../src/ui/services/FragranceServiceRoute";
import type { Fragrance } from "../../../src/ui/services/models/fragranceModel";

// Mock the getFragrances service
jest.mock("../src/ui/services/FragranceServiceRoute", () => ({
  getFragrances: jest.fn(),
}));

describe("ExpiryDate Component", () => {
  // Reset mocks before each test to ensure clean state
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display the fragrance with the closest expiry date", async () => {
    // Arrange
    const mockFragrances: Fragrance[] = [
  {
    id: 1,
    name: "Rose Oil",
    description: "A fragrant rose oil",
    expiryDate: "2025-12-01",
    cost: 25,
    volume: 100,
    fragranceIngredients: [],
  },
  {
    id: 2,
    name: "Vanilla Essence",
    description: "Sweet vanilla scent",
    expiryDate: "2025-06-10", // Closest expiry
    cost: 30,
    volume: 80,
    fragranceIngredients: [],
  },
];


    // Mock the getFragrances API call
    (getFragrances as jest.Mock).mockResolvedValueOnce(mockFragrances);

    // Act
    render(<ExpiryDate />);

    // Assert - Wait for the closest fragrance to be rendered
    await waitFor(() => {
      expect(screen.getByText("Expire Soon")).toBeInTheDocument();
      expect(screen.getByText("Vanilla Essence")).toBeInTheDocument();
    });
  });

  test("should display message when no expiry data is available", async () => {
    // Arrange
    (getFragrances as jest.Mock).mockResolvedValueOnce([]);

    // Act
    render(<ExpiryDate />);

    // Assert - Wait for the fallback message to appear
    await waitFor(() => {
      expect(
        screen.getByText("No expiry data available.")
      ).toBeInTheDocument();
    });
  });

  test("should handle API failure gracefully", async () => {
    // Arrange
    (getFragrances as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );

    // Act
    render(<ExpiryDate />);

    // Assert - It should fallback to no data message on error
    await waitFor(() => {
      expect(
        screen.getByText("No expiry data available.")
      ).toBeInTheDocument();
    });
  });
});
