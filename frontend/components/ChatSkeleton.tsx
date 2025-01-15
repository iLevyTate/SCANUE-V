export function ChatSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
      {/* Add more skeleton items */}
    </div>
  );
}
