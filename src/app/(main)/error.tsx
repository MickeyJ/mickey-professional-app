'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm">
            {/* Header with icon and title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-red-500">Development Error</h1>
            </div>

            {/* Error info container */}
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4 overflow-hidden">
                <p className="font-mono text-sm text-gray-300 break-words mb-3">{error.message}</p>
                {error.stack && (
                  <div className="border-t border-gray-700/50 pt-3">
                    <pre className="text-xs text-gray-400 overflow-x-auto whitespace-pre-wrap font-mono">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>

              {/* Error ID */}
              {error.digest && (
                <p className="text-xs text-gray-500">
                  Error ID: <code className="text-gray-400">{error.digest}</code>
                </p>
              )}

              {/* Reset button */}
              <button
                onClick={reset}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Reset Error Boundary
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Production error page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated error icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mx-auto flex items-center justify-center animate-pulse">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          {/* Decorative dots */}
          <div className="absolute top-0 right-0 w-2 h-2 bg-orange-400 rounded-full animate-ping" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-400 rounded-full animate-ping animation-delay-200" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, it's not your fault! Try refreshing the
          page or come back later.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go Home
          </button>
        </div>

        {/* Error digest for support */}
        {error.digest && (
          <p className="mt-8 text-xs text-gray-400">
            Error Reference: <code className="bg-gray-100 px-2 py-1 rounded">{error.digest}</code>
          </p>
        )}
      </div>
    </div>
  );
}
