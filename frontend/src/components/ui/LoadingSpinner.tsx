interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
} as const;

export function LoadingSpinner({ size = 'md' }: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={`animate-spin rounded-full border-primary-200 border-t-primary-600 ${sizeClasses[size]}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
