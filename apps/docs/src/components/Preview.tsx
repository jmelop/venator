import type { ReactNode } from 'react';

export interface PreviewProps {
  children: ReactNode;
}

export function Preview({ children }: PreviewProps) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6">
      {children}
    </div>
  );
}

export default Preview;
