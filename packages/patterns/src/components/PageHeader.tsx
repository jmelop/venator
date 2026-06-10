import * as React from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title: string;
  /** Supporting description below the title (sans, for prose) */
  description?: string;
  /** Metadata line below the title (mono, e.g. "Last 30 days · updated just now") */
  meta?: string;
  /** Right-aligned slot for action buttons or controls */
  actions?: React.ReactNode;
  /** Renders above the title, typically a breadcrumb trail */
  breadcrumb?: React.ReactNode;
}

export const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, meta, actions, breadcrumb, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-start justify-between gap-4 ${className}`.trim()}
      {...props}
    >
      <div className="min-w-0">
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        <h1 className="text-2xl font-medium tracking-tight text-fg truncate">{title}</h1>
        {meta && <p className="mt-1 font-mono text-xs text-fg-4">{meta}</p>}
        {description && <p className="mt-1 text-sm text-fg-3">{description}</p>}
      </div>
      {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
    </div>
  ),
);
PageHeader.displayName = 'PageHeader';
