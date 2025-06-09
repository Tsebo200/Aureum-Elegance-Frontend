/**
//  * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StockRequest from '../src/ui/Pages/StockRequest/StockRequest';
import { addStockRequestIngredient } from '../src/ui/services/StockRequestIngredientsServiceRoute';
import { addStockRequestPackaging } from '../src/ui/services/StockRequestPackagingServiceRoute';



// Mock all child components to avoid their internal logic
jest.mock('../src/ui/Components/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../src/ui/Components/Forms/StockRequest/UserTextField', () => (props: any) => (
  <select data-testid="user-select" value={props.value} onChange={e => props.onChange(e.target.value)}>
    <option value="">Select User</option>
    <option value="1">User 1</option>
  </select>
));
jest.mock('../src/ui/Components/Forms/StockRequest/IngredientsTextField', () => (props: any) => (
  <select data-testid="ingredient-select" value={props.value} onChange={e => props.onChange(e.target.value)}>
    <option value="">Select Ingredient</option>
    <option value="10">Ingredient 10</option>
  </select>
));
jest.mock('../src/ui/Components/Forms/StockRequest/PackagingSelect', () => (props: any) => (
  <select data-testid="packaging-select" value={props.value} onChange={e => props.onChange(e.target.value)}>
    <option value="">Select Packaging</option>
    <option value="20">Packaging 20</option>
  </select>
));
jest.mock('../src/ui/Components/Forms/StockRequest/WarehouseSelect', () => (props: any) => (
  <select data-testid="warehouse-select" value={props.value} onChange={e => props.onChange(e.target.value)}>
    <option value="">Select Warehouse</option>
    <option value="2">Warehouse 2</option>
  </select>
));
jest.mock('../src/ui/Components/Forms/StockRequest/AmountTextField', () => (props: any) => (
  <input data-testid="amount-input" type="number" value={props.value} onChange={e => props.onChange(e.target.value)} />
));
jest.mock('../src/ui/Components/Forms/StockRequest/RequestType', () => (props: any) => (
  <select data-testid="request-type-select" value={props.value} onChange={e => props.onChange(e.target.value)}>
    <option value="ingredient">Ingredient</option>
    <option value="packaging">Packaging</option>
  </select>
));

jest.mock('../src/ui/services/StockRequestIngredientsServiceRoute', () => ({
  addStockRequestIngredient: jest.fn(),
}));
jest.mock('../src/ui/services/StockRequestPackagingServiceRoute', () => ({
  addStockRequestPackaging: jest.fn(),
}));

describe('StockRequest Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  test('renders all form fields and submit button', () => {
    render(<StockRequest />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('user-select')).toBeInTheDocument();
    expect(screen.getByTestId('request-type-select')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-select')).toBeInTheDocument();
    expect(screen.getByTestId('warehouse-select')).toBeInTheDocument();
    expect(screen.getByTestId('amount-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit stock request/i })).toBeInTheDocument();
  });

  test('can fill and submit ingredient request successfully', async () => {
    (addStockRequestIngredient as jest.Mock).mockResolvedValueOnce({});
    render(<StockRequest />);
    fireEvent.change(screen.getByTestId('user-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('ingredient-select'), { target: { value: '10' } });
    fireEvent.change(screen.getByTestId('warehouse-select'), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /submit stock request/i }));
    await waitFor(() => {
      expect(addStockRequestIngredient).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 1,
          ingredientsId: 10,
          warehouseId: 2,
          amountRequested: 5,
        })
      );
      expect(window.alert).toHaveBeenCalledWith('Stock Request submitted successfully!');
    });
  });

  test('can fill and submit packaging request successfully', async () => {
    (addStockRequestPackaging as jest.Mock).mockResolvedValueOnce({});
    render(<StockRequest />);
    fireEvent.change(screen.getByTestId('request-type-select'), { target: { value: 'packaging' } });
    fireEvent.change(screen.getByTestId('user-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('packaging-select'), { target: { value: '20' } });
    fireEvent.change(screen.getByTestId('warehouse-select'), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: /submit stock request/i }));
    await waitFor(() => {
      expect(addStockRequestPackaging).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 1,
          packagingId: 20,
          warehouseId: 2,
          amountRequested: 7,
        })
      );
      expect(window.alert).toHaveBeenCalledWith('Stock Request submitted successfully!');
    });
  });

  test('shows alert on failed ingredient request', async () => {
    (addStockRequestIngredient as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    render(<StockRequest />);
    fireEvent.change(screen.getByTestId('user-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('ingredient-select'), { target: { value: '10' } });
    fireEvent.change(screen.getByTestId('warehouse-select'), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /submit stock request/i }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to submit stock request.');
    });
  });

  test('shows alert on failed packaging request', async () => {
    (addStockRequestPackaging as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    render(<StockRequest />);
    fireEvent.change(screen.getByTestId('request-type-select'), { target: { value: 'packaging' } });
    fireEvent.change(screen.getByTestId('user-select'), { target: { value: '1' } });
    fireEvent.change(screen.getByTestId('packaging-select'), { target: { value: '20' } });
    fireEvent.change(screen.getByTestId('warehouse-select'), { target: { value: '2' } });
    fireEvent.change(screen.getByTestId('amount-input'), { target: { value: '7' } });
    fireEvent.click(screen.getByRole('button', { name: /submit stock request/i }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Failed to submit stock request.');
    });
  });
}); 