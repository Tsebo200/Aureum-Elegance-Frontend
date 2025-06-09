import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import StockRequestAdmin from '../../src/ui/Components/StockRequestAdmin/StockRequestAdmin';
import * as StockService from '../../src/ui/services/StockRequestAdminServiceRoute';

// Setup mock fetch/service methods
jest.mock('../../../src/ui/services/StockRequestAdminServiceRoute');

const mockRequests = [
  {
    id: 1,
    amountRequested: 10,
    status: 'Pending',
    warehouse: { name: 'Main Warehouse' },
    requestType: 'Ingredients',
    ingredients: { name: 'Alcohol' },
  },
  {
    id: 2,
    amountRequested: 5,
    status: 'Approved',
    warehouse: { name: 'Backup Warehouse' },
    requestType: 'Packagings',
    packaging: { name: 'Bottle' },
  },
];

describe('StockRequestAdmin Component', () => {
  // Reset mocks after each test
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading and fetches requests', async () => {
    // Arrange
    (StockService.getStockRequests as jest.Mock).mockResolvedValueOnce(mockRequests);

    // Act
    render(<StockRequestAdmin />);

    // Assert: Wait for table to show fetched data
    await waitFor(() => {
      expect(screen.getByText(/stock requests/i)).toBeInTheDocument();
      expect(screen.getByText(/Alcohol/)).toBeInTheDocument();
      expect(screen.getByText(/Bottle/)).toBeInTheDocument();
    });
  });

  test('filters requests by status', async () => {
    // Arrange
    (StockService.getStockRequests as jest.Mock).mockResolvedValue(mockRequests);

    // Act
    render(<StockRequestAdmin />);

    // Wait for initial data load
    await waitFor(() => screen.getByText('Alcohol'));

    // Change filter to Approved
    fireEvent.mouseDown(screen.getAllByRole('button')[1]); // second Select
    fireEvent.click(screen.getByText('Approved'));

    // Assert: Only approved should be shown
    await waitFor(() => {
      expect(screen.queryByText('Alcohol')).not.toBeInTheDocument();
      expect(screen.getByText('Bottle')).toBeInTheDocument();
    });
  });

  test('switches between Ingredients and Packagings mode', async () => {
    // Arrange
    (StockService.getStockRequests as jest.Mock)
      .mockResolvedValueOnce(mockRequests) // initial render
      .mockResolvedValueOnce([]);         // after switching

    // Act
    render(<StockRequestAdmin />);
    await waitFor(() => screen.getByText('Alcohol'));

    // Switch to Packagings
    fireEvent.mouseDown(screen.getAllByRole('button')[0]); // first Select
    fireEvent.click(screen.getByText('Packagings'));

    // Assert: should reload and update list
    await waitFor(() => {
      expect(StockService.getStockRequests).toHaveBeenCalledWith('Packagings');
    });
  });

  test('calls respondToRequest when approve/reject clicked', async () => {
    // Arrange
    (StockService.getStockRequests as jest.Mock).mockResolvedValue(mockRequests);
    const respondMock = jest.fn().mockResolvedValue(undefined);
    (StockService.respondToRequest as jest.Mock).mockImplementation(respondMock);

    // Act
    render(<StockRequestAdmin />);
    await waitFor(() => screen.getByText('Alcohol'));

    // Click Approve on pending request
    fireEvent.click(screen.getByText('Approve'));

    // Assert
    await waitFor(() => {
      expect(respondMock).toHaveBeenCalledWith('Ingredients', 1, true);
    });

    // Click Reject on pending request
    fireEvent.click(screen.getByText('Reject'));

    await waitFor(() => {
      expect(respondMock).toHaveBeenCalledWith('Ingredients', 1, false);
    });
  });

  test('disables buttons when request is not pending', async () => {
    // Arrange
    const onlyApproved = [mockRequests[1]];
    (StockService.getStockRequests as jest.Mock).mockResolvedValue(onlyApproved);

    // Act
    render(<StockRequestAdmin />);
    await waitFor(() => screen.getByText('Bottle'));

    // Assert: buttons are disabled
    const approveBtn = screen.getByText('Approve');
    const rejectBtn = screen.getByText('Reject');
    expect(approveBtn).toBeDisabled();
    expect(rejectBtn).toBeDisabled();
  });

  test('handles fetch error gracefully', async () => {
    // Arrange
    (StockService.getStockRequests as jest.Mock).mockRejectedValueOnce(new Error('Failed'));

    // Act
    render(<StockRequestAdmin />);

    // Assert: ensure error doesn't crash
    await waitFor(() => {
      expect(StockService.getStockRequests).toHaveBeenCalled();
    });
  });
});
