import { Bot } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Bot className="mb-4 h-12 w-12 animate-bounce text-blue-500" />
      <p className="text-lg text-gray-600">Loading chat interface...</p>
    </div>
  );
}
