export const CHAT_CONSTANTS = {
  MAX_MESSAGES: 50,
  TIMEOUT_MS: 10000,
  DEFAULT_AGENT: 'General',
  INITIAL_MESSAGE: 'Hi there! I am your AI assistant. How can I help you today?',
} as const;

export const ERROR_MESSAGES = {
  EMPTY_INPUT: 'Please enter a message',
  SEND_FAILED: 'Failed to send message',
  HTTP_ERROR: (status: number) => `HTTP error! status: ${status}`,
} as const;
