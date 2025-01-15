"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-2 text-red-600">
        <AlertCircle className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
      </div>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
