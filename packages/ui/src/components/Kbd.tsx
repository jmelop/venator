import { forwardRef } from 'react';
import type { ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center rounded border border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] px-1.5 py-0.5 leading-none"

export const Kbd = forwardRef<HTMLElement, KbdProps>(({ children, className }, ref) => (
  <kbd
    ref={ref}
    className={className ? `${base} ${className}` : base}
  >
    {children}
  </kbd>
));
Kbd.displayName = 'Kbd';
