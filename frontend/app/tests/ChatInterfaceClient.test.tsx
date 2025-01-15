import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInterfaceClient } from '../../components/ChatInterfaceClient';

test('renders initial assistant message', () => {
  render(<ChatInterfaceClient />);
  expect(screen.getByText(/hi there/i)).toBeInTheDocument();
});

test('displays user message after input', async () => {
  render(<ChatInterfaceClient />);
  const input = screen.getByLabelText(/message .* agent/i);
  const submitButton = screen.getByTestId('chat-submit');

  fireEvent.change(input, { target: { value: 'Hello!' } });
  fireEvent.click(submitButton);

  expect(await screen.findByText('Hello!')).toBeInTheDocument();
});

test('shows error message when input is empty', async () => {
  render(<ChatInterfaceClient />);
  const submitButton = screen.getByTestId('chat-submit');

  fireEvent.click(submitButton);

  expect(await screen.findByText(/please enter a message/i)).toBeInTheDocument();
});
