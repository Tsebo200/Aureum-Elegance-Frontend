// __tests__/Suppliers.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { Supplier } from '../src/ui/services/models/supplierModel';
import Suppliers from '../src/ui/Pages/Suppliers/Suppliers';
import * as SupplierService from '../src/ui/services/SupplierServiceRoute';

// Mock subcomponents to isolate Suppliers tests
jest.mock('../../src/ui/Components/Sidebar', () => () => <div>Sidebar</div>);
jest.mock('../../src/ui/Components/Tabs/Record Loss/RecordLoss', () => () => <div>RecordLoss Component</div>);
jest.mock('../../src/ui/Components/WasteLossListComponent/WasteLossListComponent', () => () => <div>WasteLossListComponent</div>);
jest.mock('../../src/ui/pages/StockManagement/SMDeliveries', () => ({
  DeliveriesPanel: () => <div>DeliveriesPanel</div>
}));

describe('Suppliers Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('fetches and displays suppliers on mount', async () => {
    const suppliersMock = [
      { supplierID: 1, supplierName: 'Supplier A', contactPerson: 'Alice', phoneNumber: '12345' },
      { supplierID: 2, supplierName: 'Supplier B', contactPerson: 'Bob', phoneNumber: '67890' },
    ];
    jest.spyOn(SupplierService, 'getSuppliers').mockResolvedValueOnce(suppliersMock);

    render(<Suppliers />);

    // Wait for suppliers to be rendered
    for (const supplier of suppliersMock) {
      await screen.findByText(supplier.supplierName);
      expect(screen.getByText(supplier.contactPerson)).toBeInTheDocument();
      expect(screen.getByText(supplier.phoneNumber)).toBeInTheDocument();
    }
  });

  test('adds a supplier after filling form and submitting', async () => {
    const initialSuppliers: Supplier[] = [];
    jest.spyOn(SupplierService, 'getSuppliers').mockResolvedValueOnce(initialSuppliers);

    const newSupplier = {
      supplierID: 3,
      supplierName: 'New Supplier',
      contactPerson: 'New Contact',
      phoneNumber: '555-1234',
    };
    const addSupplierMock = jest.spyOn(SupplierService, 'addSupplier').mockResolvedValueOnce(newSupplier);
// Display the Suppliers component
    render(<Suppliers />);

    // Fill inputs
    fireEvent.change(screen.getByLabelText(/Supplier Name/i), { target: { value: newSupplier.supplierName } });
    fireEvent.change(screen.getByLabelText(/Contact Person/i), { target: { value: newSupplier.contactPerson } });
    fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: newSupplier.phoneNumber } });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /Add Supplier/i }));

    // Wait for the new supplier to appear
    await screen.findByText(newSupplier.supplierName);

    expect(addSupplierMock).toHaveBeenCalledWith({
      supplierID: 0,
      supplierName: newSupplier.supplierName,
      contactPerson: newSupplier.contactPerson,
      phoneNumber: newSupplier.phoneNumber,
    });

    // Form should be cleared after adding
    expect(screen.getByLabelText(/Supplier Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Contact Person/i)).toHaveValue('');
    expect(screen.getByLabelText(/Contact Number/i)).toHaveValue('');
  });

  test('shows alert if form fields are empty when adding supplier', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(SupplierService, 'getSuppliers').mockResolvedValueOnce([]);

    render(<Suppliers />);

    // Submit form without filling fields
    fireEvent.click(screen.getByRole('button', { name: /Add Supplier/i }));

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  test('deletes supplier on clicking remove button', async () => {
    const suppliersMock = [
      { supplierID: 1, supplierName: 'Supplier A', contactPerson: 'Alice', phoneNumber: '12345' },
    ];
    jest.spyOn(SupplierService, 'getSuppliers').mockResolvedValueOnce(suppliersMock);
    const deleteSupplierMock = jest.spyOn(SupplierService, 'deleteSupplier').mockResolvedValueOnce();

    render(<Suppliers />);

    // Wait for supplier to appear
    await screen.findByText('Supplier A');

    fireEvent.click(screen.getByRole('button', { name: /Remove/i }));

    // Wait for supplier to be removed from the UI
    await waitFor(() => {
      expect(screen.queryByText('Supplier A')).not.toBeInTheDocument();
    });

    expect(deleteSupplierMock).toHaveBeenCalledWith(1);
  });

  test('changes tabs correctly', () => {
    jest.spyOn(SupplierService, 'getSuppliers').mockResolvedValueOnce([]);

    render(<Suppliers />);

    const deliveriesTab = screen.getByRole('tab', { name: /Deliveries/i });
    const wasteLossTab = screen.getByRole('tab', { name: /Waste Loss/i });
    const recordLossTab = screen.getByRole('tab', { name: /Record Loss/i });

    // Default tab is Suppliers content
    expect(screen.getByText(/Suppliers/i)).toBeInTheDocument();

    fireEvent.click(deliveriesTab);
    expect(screen.getByText(/DeliveriesPanel/i)).toBeInTheDocument();

    fireEvent.click(wasteLossTab);
    expect(screen.getByText(/WasteLossListComponent/i)).toBeInTheDocument();

    fireEvent.click(recordLossTab);
    expect(screen.getByText(/RecordLoss Component/i)).toBeInTheDocument();
  });
});
