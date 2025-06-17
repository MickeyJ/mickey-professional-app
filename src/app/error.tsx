'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Development Error</h1>
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p className="font-mono text-sm">{error.message}</p>
          {error.stack && <pre className="mt-2 text-xs overflow-auto">{error.stack}</pre>}
        </div>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    );
  }

  // Production error page
  return <div>Something went wrong!</div>;
}
