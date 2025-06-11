import { render, screen, waitFor } from '@testing-library/react';
import { PieChart } from '../../../src/ui/Components/Graphs/PieChart';
import React from 'react';

// Setup: globally mock fetch before all tests
beforeAll(() => {
  global.fetch = jest.fn();
});

// Teardown: reset fetch mocks after each test
afterEach(() => {
  jest.resetAllMocks();
});

describe('PieChart Component', () => {
  test('renders loading state initially', () => {
    // Act: render the PieChart component
    render(<PieChart />);

    // Assert: "Loading Pie Chart..." message is shown
    expect(screen.getByText(/loading pie chart/i)).toBeInTheDocument();
  });

  test('renders Pie chart on successful fetch', async () => {
    // Arrange: mock fragrance API response
    const mockFragrances = [
      { id: 1, name: 'Rose', cost: 20 },
      { id: 2, name: 'Jasmine', cost: 30 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFragrances,
    });

    // Act: render component
    render(<PieChart />);

    // Assert: wait for chart title to be rendered
    await waitFor(() =>
      expect(screen.getByText(/fragrance cost breakdown/i)).toBeInTheDocument()
    );
  });

  test('renders chart with empty fragrance list (zero data)', async () => {
    // Arrange: mock API with empty list
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    // Act
    render(<PieChart />);

    // Assert: chart still renders with empty data
    await waitFor(() =>
      expect(screen.getByText(/fragrance cost breakdown/i)).toBeInTheDocument()
    );
  });

  test('handles fetch error and hides loader', async () => {
    // Arrange: simulate fetch error
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    // Act
    render(<PieChart />);

    // Assert: loader disappears after error
    await waitFor(() =>
      expect(screen.queryByText(/loading pie chart/i)).not.toBeInTheDocument()
    );
  });
});
