// __tests__/AddProductForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddProductForm from '../../../../src/ui/components/Forms/FinishedProductComponents/AddProductForm';
import * as FinishedProductService from '../../../../src/ui/services/FinishedProductService';
import * as FragranceService from '../../../../src/ui/services/FragranceServiceRoute';
import * as PackagingService from '../../../../src/ui/services/packagingServiceRoute';

// 🧪 Mock services
jest.mock('../../../../src/ui/services/FinishedProductService');
jest.mock('../../../../src/ui/services/FragranceServiceRoute');
jest.mock('../../../../src/ui/services/packagingServiceRoute');

describe('AddProductForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', async () => {
    // Arrange: mock fragrance and packaging fetches
    (FragranceService.getFragrances as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Rose' },
    ]);

    (PackagingService.getAllPackagings as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Bottle', type: 'Glass', stock: 100 },
    ]);

    // Act
    render(<AddProductForm />);

    // Assert
    expect(await screen.findByText('Add Finished Product')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Fragrance')).toBeInTheDocument();
    expect(screen.getByText('Packaging Options')).toBeInTheDocument();
  });

  test('submits the form with correct data', async () => {
    // Arrange mock data
    (FragranceService.getFragrances as jest.Mock).mockResolvedValue([
      { id: 5, name: 'Citrus' },
    ]);

    (PackagingService.getAllPackagings as jest.Mock).mockResolvedValue([
      { id: 10, name: 'Box', type: 'Paper', stock: 50 },
    ]);

    const mockCreatedProduct = { productID: 123 };
    (FinishedProductService.addFinishedProduct as jest.Mock).mockResolvedValue(
      mockCreatedProduct
    );
    (FinishedProductService.addFinishedProductPackaging as jest.Mock).mockResolvedValue(
      {}
    );

    render(<AddProductForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Product Name'), {
      target: { value: 'Luxury Scent' },
    });

    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '25' },
    });

    // Wait for fragrances to load
    const fragranceDropdown = await screen.findByText('Select a fragrance');
    fireEvent.mouseDown(fragranceDropdown);
    fireEvent.click(screen.getByText('Citrus'));

    // Wait for packaging to load
    const packagingDropdown = screen.getByText('Packaging Options');
    fireEvent.mouseDown(packagingDropdown);
    fireEvent.click(screen.getByText('Box'));

    // Simulate entering amount for packaging
    await waitFor(() => {
      const amountInput = screen.getByDisplayValue('0');
      fireEvent.change(amountInput, { target: { value: '5' } });
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    // Assert: addFinishedProduct was called with correct data
    await waitFor(() => {
      expect(FinishedProductService.addFinishedProduct).toHaveBeenCalledWith({
        productName: 'Luxury Scent',
        quantity: 25,
        fragranceID: 5,
      });

      expect(FinishedProductService.addFinishedProductPackaging).toHaveBeenCalledWith({
        ProductID: 123,
        PackagingId: 10,
        Amount: 5,
      });
    });
  });

  test('shows alert if form is incomplete', async () => {
    window.alert = jest.fn();

    (FragranceService.getFragrances as jest.Mock).mockResolvedValue([]);
    (PackagingService.getAllPackagings as jest.Mock).mockResolvedValue([]);

    render(<AddProductForm />);

    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Please fill in all fields with valid values.'
      );
    });
  });
});
