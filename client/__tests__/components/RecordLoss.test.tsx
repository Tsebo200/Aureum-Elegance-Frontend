import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecordLoss from "../../src/ui/Components/Tabs/Record Loss/RecordLoss";
import { MemoryRouter } from "react-router-dom";

// Mock fetch and service calls
global.fetch = jest.fn().mockImplementation((url) => {
  if (url.includes("Ingredients")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: "Salt" }]),
    });
  }
  if (url.includes("Packaging")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ id: 2, name: "Bottle" }]),
    });
  }
  if (url.includes("Fragrance")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ id: 3, name: "Lavender" }]),
    });
  }
  if (url.includes("Warehouse")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          warehouseID: url.endsWith("1") ? 1 : 2,
          name: url.endsWith("1") ? "Main" : "Backup",
        }),
    });
  }
  return Promise.resolve({
    json: () => Promise.resolve([]),
  });
});

// Mock getUsers
jest.mock("../../src/ui/services/UserServiceRoute", () => ({
  getUsers: jest.fn().mockResolvedValue([{ userId: 1, name: "Admin" }]),
}));

describe("RecordLoss Integration", () => {
  it("fills and submits the form", async () => {
    render(<RecordLoss />, { wrapper: MemoryRouter });

    // Debug DOM to check what rendered (uncomment to use)
    // screen.debug();

    // Open item type select dropdown
    const itemTypeSelect = screen.getByLabelText("item type");
    await userEvent.click(itemTypeSelect);

    // Wait for the "Ingredient" option to appear and click it
    const ingredientOption = await screen.findByText("Ingredient");
    expect(ingredientOption).toBeInTheDocument();
    await userEvent.click(ingredientOption);

    // Open item select dropdown after selecting item type
    const itemSelect = await screen.findByLabelText("item");
    await userEvent.click(itemSelect);

    // Wait for item option "Salt" to appear
    const itemOption = await screen.findByText("Salt");
    expect(itemOption).toBeInTheDocument();
    await userEvent.click(itemOption);

    // Fill quantity input
    const quantityInput = screen.getByLabelText("quantity");
    await userEvent.type(quantityInput, "5");

    // Fill reason input
    const reasonInput = screen.getByLabelText("reason");
    await userEvent.type(reasonInput, "Spilled");

    // Select user
    const userSelect = await screen.findByLabelText("user");
    await userEvent.click(userSelect);

    const userOption = await screen.findByText("Admin");
    expect(userOption).toBeInTheDocument();
    await userEvent.click(userOption);

    // Select warehouse
    const warehouseSelect = await screen.findByLabelText("warehouse");
    await userEvent.click(warehouseSelect);

    const warehouseOption = await screen.findByText("Main");
    expect(warehouseOption).toBeInTheDocument();
    await userEvent.click(warehouseOption);

    // Submit the form
    const submitBtn = screen.getByLabelText("record");
    await userEvent.click(submitBtn);

    // Wait for the POST request to be called with expected URL & method
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/WasteLossRecordIngredient"),
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });
});
