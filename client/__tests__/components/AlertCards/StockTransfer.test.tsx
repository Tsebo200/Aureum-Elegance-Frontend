import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import StockTransfer from "../../../src/ui/Components/AlertCards/StockTransfer/StockTransfer";
import { getStockRequests } from "../../../src/ui/services/StockRequestServiceRoute";
import type { StockRequestAdminDTO } from "../../../src/ui/services/models/stockRequestAdminModel";

// ✅ Mock the service
jest.mock("../../../src/ui/services/StockRequestServiceRoute", () => ({
  getStockRequests: jest.fn(),
}));

describe("StockTransfer Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should display correct pending units", async () => {
    const mockIngredients: StockRequestAdminDTO[] = [
      {
        id: 1,
        status: "Pending",
        amountRequested: 10,
        requestDate: "",
        requestType: "Ingredients",
        ingredients: {
          id: 1,
          name: "Salt",
          type: "Mineral",
          cost: 1,
          isExpired: false,
        },
      },
      {
        id: 2,
        status: "Approved",
        amountRequested: 5,
        requestDate: "",
        requestType: "Ingredients",
        ingredients: {
          id: 2,
          name: "Sugar",
          type: "Organic",
          cost: 2,
          isExpired: false,
        },
      },
    ];

    const mockPackagings: StockRequestAdminDTO[] = [
      {
        id: 3,
        status: "Pending",
        amountRequested: 20,
        requestDate: "",
        requestType: "Packagings",
        packaging: {
          id: 1,
          name: "Bottle",
          type: "Glass",
          stock: 100,
        },
      },
    ];

    (getStockRequests as jest.Mock)
      .mockResolvedValueOnce(mockIngredients)
      .mockResolvedValueOnce(mockPackagings);

    render(<StockTransfer />);

    await waitFor(() => {
      expect(screen.getByText("Stock TransferPending")).toBeInTheDocument();
      expect(screen.getByText("30 units")).toBeInTheDocument(); // 10 (Pending) + 20 (Pending)
    });
  });

  test("should show 0 units on API failure", async () => {
    (getStockRequests as jest.Mock).mockRejectedValue(new Error("API error"));

    render(<StockTransfer />);

    await waitFor(() => {
      expect(screen.getByText("0 units")).toBeInTheDocument();
    });
  });

  test("should show 0 units if there are no pending requests", async () => {
    const allApproved: StockRequestAdminDTO[] = [
      {
        id: 1,
        status: "Approved",
        amountRequested: 10,
        requestDate: "",
        requestType: "Ingredients",
        ingredients: {
          id: 1,
          name: "Salt",
          type: "Mineral",
          cost: 1,
          isExpired: false,
        },
      },
    ];

    (getStockRequests as jest.Mock)
      .mockResolvedValueOnce(allApproved)
      .mockResolvedValueOnce([]);

    render(<StockTransfer />);

    await waitFor(() => {
      expect(screen.getByText("0 units")).toBeInTheDocument();
    });
  });
});
