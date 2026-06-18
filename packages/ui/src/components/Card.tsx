import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Surface elevation: 'raised' sits one step above the page background */
  surface?: 'base' | 'raised';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  /** Right-aligned slot for actions (buttons, badges, etc.) */
  action?: React.ReactNode;
  /** Renders a bottom border separator between header and body */
  separator?: boolean;
  /** 'sm' renders a compact title with a mono description, for chart/data cards */
  size?: 'md' | 'sm';
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const surfaceStyles: Record<NonNullable<CardProps['surface']>, string> = {
  base: 'bg-bg-1',
  raised: 'bg-bg-2',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', surface = 'raised', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`${surfaceStyles[surface]} border border-[var(--border-subtle)] rounded-lg shadow-sm ${paddingStyles[padding]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

const headerTitleStyles: Record<NonNullable<CardHeaderProps['size']>, string> = {
  md: 'text-base font-semibold text-fg truncate',
  sm: 'text-sm font-medium text-fg-2 truncate',
};

const headerDescriptionStyles: Record<NonNullable<CardHeaderProps['size']>, string> = {
  md: 'mt-1 text-sm text-fg-3',
  sm: 'mt-0.5 font-mono text-xs text-fg-4',
};

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, description, action, separator = false, size = 'md', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex items-start justify-between gap-4',
        separator ? 'border-b border-[var(--border-subtle)] pb-4 mb-4' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="min-w-0">
        {title && <h3 className={headerTitleStyles[size]}>{title}</h3>}
        {description && <p className={headerDescriptionStyles[size]}>{description}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`text-fg ${className}`.trim()} {...props}>
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center gap-2 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';
