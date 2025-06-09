import { render, screen, waitFor } from '@testing-library/react';
import { LineChart } from '../../../src/ui/Components/Graphs/LineChart';
import React from 'react';

// Setup: globally mock fetch before tests
beforeAll(() => {
  global.fetch = jest.fn();
});

// Teardown: reset fetch mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});

describe('LineChart Component', () => {
  test('renders loading state initially', () => {
    // Act: Render component
    render(<LineChart />);

    // Assert: loader is visible
    expect(screen.getByText(/loading chart/i)).toBeInTheDocument();
  });

  test('renders chart on successful fetch', async () => {
    // Arrange: mock each endpoint with sample data
    const mockPackaging = [{ quantityLoss: 10 }, { quantityLoss: 5 }];
    const mockIngredients = [{ quantityLoss: 3 }];
    const mockFragrance = [{ quantityLoss: 2 }];
    const mockBatch = [{ quantityLoss: 1 }];

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPackaging,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockIngredients,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFragrance,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBatch,
      });

    // Act
    render(<LineChart />);

    // Assert: wait until chart title is in the document
    await waitFor(() =>
      expect(screen.getByText(/total waste loss per item type/i)).toBeInTheDocument()
    );
  });

  test('renders chart with all zero data', async () => {
    // Arrange: mock empty responses
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, json: async () => [] });

    // Act
    render(<LineChart />);

    // Assert: still renders chart even if all values are 0
    await waitFor(() =>
      expect(screen.getByText(/total waste loss per item type/i)).toBeInTheDocument()
    );
  });

  test('handles fetch error gracefully', async () => {
    // Arrange: make fetch throw error
    (fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    // Act
    render(<LineChart />);

    // Assert: loading disappears
    await waitFor(() =>
      expect(screen.queryByText(/loading chart/i)).not.toBeInTheDocument()
    );
  });
});
