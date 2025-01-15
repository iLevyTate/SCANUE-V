export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
}

export function isToday(timestamp: string): boolean {
  const date = new Date(timestamp);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}
