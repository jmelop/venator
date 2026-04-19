'use client';

import { forwardRef } from 'react';

export type ProgressSize = 'sm' | 'md';

export interface ProgressProps {
  value: number;
  size?: ProgressSize;
  className?: string;
}

const sizeMap: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, size = 'md', className = '' }, ref) => {
    const clamped = Math.min(Math.max(value, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={[
          'w-full rounded-full bg-neutral-200 dark:bg-neutral-700',
          sizeMap[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-300"
          style={{ width: `${clamped}%` }}
        />
      </div>
    );
  },
);
Progress.displayName = 'Progress';
