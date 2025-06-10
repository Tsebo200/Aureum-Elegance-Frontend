import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProducePerfumeForm from '../../../../src/ui/Components/Forms/FinishedProductComponents/ProducePerfumeForm';
import { getAllIngredients } from '../../../../src/ui/services/IngredientsServiceRoutes';
import { addFragrance, addFragranceIngredient } from '../../../../src/ui/services/FragranceServiceRoute';
import { BrowserRouter } from 'react-router-dom';


// 🧪 Mock API service functions
jest.mock('../../../../src/ui/services/IngredientsServiceRoutes', () => ({
  getAllIngredients: jest.fn(),
}));
jest.mock('../../../../src/ui/services/FragranceServiceRoute', () => ({
  addFragrance: jest.fn(),
  addFragranceIngredient: jest.fn(),
}));

describe('ProducePerfumeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockIngredients = [
    { id: 1, name: 'Lavender' },
    { id: 2, name: 'Rose' },
  ];

  test('renders all input fields and ingredient select', async () => {
    // Arrange
    (getAllIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients);

    render(
      <BrowserRouter>
        <ProducePerfumeForm />
      </BrowserRouter>
    );

    // Assert input fields and label exist
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cost per unit/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/volume per bottle/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/ingredients/i)).toBeInTheDocument();
    });
  });

  test('updates form inputs and selects ingredient', async () => {
    (getAllIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients);

    render(
      <BrowserRouter>
        <ProducePerfumeForm />
      </BrowserRouter>
    );

    // Fill form fields
    fireEvent.change(await screen.findByLabelText(/name/i), {
      target: { value: 'Ocean Mist' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'A refreshing scent' },
    });
    fireEvent.change(screen.getByLabelText(/cost per unit/i), {
      target: { value: '45' },
    });
    fireEvent.change(screen.getByLabelText(/volume per bottle/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/expiry date/i), {
      target: { value: '2026-12-31' },
    });

    // Select an ingredient (simulate MUI dropdown)
    fireEvent.mouseDown(screen.getByLabelText(/ingredients/i));
    await waitFor(() => {
      expect(screen.getByText('Lavender')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Lavender'));

    // Check if amount field appeared
    await waitFor(() => {
      expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    });

    // Change amount
    fireEvent.change(screen.getByDisplayValue('0'), {
      target: { value: '25' },
    });

    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    // Arrange
    (getAllIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients);
    (addFragrance as jest.Mock).mockResolvedValueOnce({ id: 123 });
    (addFragranceIngredient as jest.Mock).mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <ProducePerfumeForm />
      </BrowserRouter>
    );

    // Fill out the form
    fireEvent.change(await screen.findByLabelText(/name/i), {
      target: { value: 'Ocean Mist' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'A refreshing scent' },
    });
    fireEvent.change(screen.getByLabelText(/cost per unit/i), {
      target: { value: '45' },
    });
    fireEvent.change(screen.getByLabelText(/volume per bottle/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/expiry date/i), {
      target: { value: '2026-12-31' },
    });

    // Select ingredient
    fireEvent.mouseDown(screen.getByLabelText(/ingredients/i));
    fireEvent.click(await screen.findByText('Lavender'));
    fireEvent.change(screen.getByDisplayValue('0'), {
      target: { value: '25' },
    });

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /produce perfume/i }));

    // Assert successful calls
    await waitFor(() => {
      expect(addFragrance).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Ocean Mist',
          description: 'A refreshing scent',
          cost: 45,
          volume: 100,
        })
      );

      expect(addFragranceIngredient).toHaveBeenCalledWith({
        fragranceID: 123,
        ingredientsID: 1,
        amount: 25,
      });
    });
  });

  test('displays error on failed API call', async () => {
    (getAllIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients);
    (addFragrance as jest.Mock).mockRejectedValueOnce(new Error('Error creating fragrance'));

    render(
      <BrowserRouter>
        <ProducePerfumeForm />
      </BrowserRouter>
    );

    fireEvent.change(await screen.findByLabelText(/name/i), {
      target: { value: 'FailTest' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Failing scent' },
    });
    fireEvent.change(screen.getByLabelText(/cost per unit/i), {
      target: { value: '20' },
    });
    fireEvent.change(screen.getByLabelText(/volume per bottle/i), {
      target: { value: '50' },
    });
    fireEvent.change(screen.getByLabelText(/expiry date/i), {
      target: { value: '2026-10-10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /produce perfume/i }));

    // Assert error message
    await waitFor(() => {
      expect(screen.getByText(/failed to produce perfume/i)).toBeInTheDocument();
    });
  });
});
