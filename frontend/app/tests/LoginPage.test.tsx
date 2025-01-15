import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../login/page';

test('renders login form elements', () => {
  render(<LoginPage />);
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

test('allows user to type in email and password fields', () => {
  render(<LoginPage />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

test('handles form submission', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<LoginPage />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  expect(consoleSpy).toHaveBeenCalledWith('Login attempt with:', {
    email: 'test@example.com',
    password: 'password123',
  });

  consoleSpy.mockRestore();
});
