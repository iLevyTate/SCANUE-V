export function sanitizeInput(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(/[<>]/g, "") // Basic XSS prevention
    .slice(0, 1000); // Enforce max length
}
