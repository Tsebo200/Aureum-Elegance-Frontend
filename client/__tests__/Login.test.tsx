import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../src/ui/Pages/Login/login';
import { addLoginUser } from '../src/ui/services/UserServiceRoute';
import { BrowserRouter } from 'react-router-dom';

// Mock the addLoginUser API service
jest.mock('../src/ui/services/UserServiceRoute', () => ({
  addLoginUser: jest.fn(),
}));

// Mock react-router-dom's useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Component', () => {
  // Reset mocks and localStorage before each test
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('renders email and password inputs and login button', () => {
    // Arrange & Act: render the component wrapped in Router
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Assert: inputs and button are in the document
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates input values on user typing', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Act: simulate user typing
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    // Assert: input values updated correctly
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('mypassword');
  });

  test('successful login calls addLoginUser, stores data, and navigates', async () => {
    // Arrange: mock resolved value for addLoginUser
    (addLoginUser as jest.Mock).mockResolvedValueOnce({
      userId: 123,
      role: 'Employee',
      name: '',
      email: 'test@example.com',
      password: 'mypassword',
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Fill the form inputs
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'mypassword' } });

    // Act: submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert: wait for async actions
    await waitFor(() => {
      // Check addLoginUser was called with correct data
      expect(addLoginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'mypassword',
        name: '',
        role: 'Employee',
      });

      // Check localStorage was set correctly
      expect(localStorage.getItem('userId')).toBe('123');
      expect(localStorage.getItem('role')).toBe('Employee');

      // Check navigation happened to /dashboard
      expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('failed login sets error message', async () => {
    // Arrange: mock rejected promise to simulate login failure
    (addLoginUser as jest.Mock).mockRejectedValueOnce(new Error('Login failed'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'badpass' } });

    // Act: submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert: error message is shown
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    });

    // Also ensure navigation and localStorage are NOT called
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem('userId')).toBeNull();
  });
});
