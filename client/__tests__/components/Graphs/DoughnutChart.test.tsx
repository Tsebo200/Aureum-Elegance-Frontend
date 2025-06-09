import { render, screen, waitFor } from '@testing-library/react';
import DoughnutChart from '../../../src/ui/Components/Graphs/DoughnutChart';
import React from 'react';

// Setup: mock fetch globally
beforeAll(() => {
  global.fetch = jest.fn();
});

// Teardown: reset fetch mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});

describe('DoughnutChart Component', () => {
  test('renders loading state initially', () => {
    // Act: render component
    render(<DoughnutChart />);

    // Assert: loading indicator shown
    expect(screen.getByText(/loading chart/i)).toBeInTheDocument();
  });

  test('renders Doughnut chart on successful fetch', async () => {
    // Arrange: mock fetch responses
    const mockIngredients = [
      { amountRequested: 10 },
      { amountRequested: 5 },
    ];
    const mockPackagings = [
      { amountRequested: 3 },
      { amountRequested: 2 },
    ];

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockIngredients,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPackagings,
      });

    // Act
    render(<DoughnutChart />);

    // Assert: wait until chart is rendered
    await waitFor(() =>
      expect(
        screen.getByText(/total stock requested/i)
      ).toBeInTheDocument()
    );
  });

  test('shows message when both ingredient and packaging totals are 0', async () => {
    // Arrange: mock fetch with empty data
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    // Act
    render(<DoughnutChart />);

    // Assert: message shown when totals are 0
    await waitFor(() =>
      expect(
        screen.getByText(/no stock requests found/i)
      ).toBeInTheDocument()
    );
  });

  test('handles fetch error and hides loader', async () => {
    // Arrange: simulate network failure
    (fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    // Act
    render(<DoughnutChart />);

    // Assert: fallback message or no chart
    await waitFor(() => {
      expect(
        screen.queryByText(/loading chart/i)
      ).not.toBeInTheDocument();
    });
  });
});
