export function BotAvatar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-full w-full p-1"
      role="img"
      aria-label="AI Assistant Avatar"
    >
      <title>AI Assistant Avatar</title>
      <path
        d="M12 2a10 10 0 0 1 10 10c0 4.42-2.87 8.17-6.84 9.5-1.08.36-2.03.5-3.16.5-1.13 0-2.08-.14-3.16-.5C4.87 20.17 2 16.42 2 12 2 6.48 6.48 2 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}
