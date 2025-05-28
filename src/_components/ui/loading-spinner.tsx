interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

export function LoadingSpinner({
  size = 36,
  color = 'currentColor',
  thickness = 4,
}: LoadingSpinnerProps) {
  return (
    <div
      className="min-h-10 flex justify-center items-center"
      role="status"
    >
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={thickness}
        />
        <path
          className="opacity-75"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          d="M12 2C6.47715 2 2 6.47715 2 12"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
