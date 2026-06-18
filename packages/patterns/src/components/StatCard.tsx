import * as React from 'react';
import { Badge, Card, CardContent, Sparkline } from '@venator-ui/ui';

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  /** How the trend is rendered: quiet mono text (default) or a pill badge */
  trendStyle?: 'text' | 'badge';
  sparkline?: number[];
  className?: string;
  /** Additional classes applied to the title element */
  titleClassName?: string;
  /** Additional classes applied to the value element */
  valueClassName?: string;
  /** Decorative prefix rendered above the title (e.g. "01", "02") */
  prefix?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      description,
      icon,
      trend,
      trendLabel,
      trendStyle = 'text',
      sparkline,
      className = '',
      titleClassName = '',
      valueClassName = '',
      prefix,
    },
    ref,
  ) => {
    const trendDown = trend !== undefined && trend < 0;
    const sparklineColor = trendDown ? 'var(--danger)' : 'var(--fg)';

    return (
      // Stat density is intrinsic to the pattern: p-3.5 sits between Card's
      // generic sm/md steps, so the Card scale is bypassed here.
      <Card ref={ref} padding="none" className={`p-3.5 ${className}`.trim()}>
        <CardContent>
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              {prefix && (
                <span className="text-xs font-mono text-fg-5">{prefix}</span>
              )}
              <p className={['font-mono text-2xs uppercase tracking-wider text-fg-4', titleClassName].filter(Boolean).join(' ')}>{title}</p>
            </div>
            {icon && (
              <span className="text-fg-3 shrink-0">{icon}</span>
            )}
          </div>

          <p className={['mt-1 text-[26px] font-medium tracking-tight text-fg', valueClassName].filter(Boolean).join(' ')}>{value}</p>

          {(trend !== undefined || (sparkline && sparkline.length > 0)) && (
            <div className="mt-1 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 min-w-0">
                {trend !== undefined && (
                  trendStyle === 'badge' ? (
                    <Badge variant={trend >= 0 ? 'success' : 'error'} size="sm">
                      {trend >= 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-0.5">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-0.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      )}
                      {Math.abs(trend)}%
                    </Badge>
                  ) : (
                    <span className={`font-mono text-2xs ${trendDown ? 'text-danger' : 'text-success'}`}>
                      {trend >= 0 ? '+' : ''}{trend}%
                    </span>
                  )
                )}
                {trend !== undefined && trendLabel && (
                  <span className="text-xs text-fg-3 truncate">{trendLabel}</span>
                )}
              </div>
              {sparkline && sparkline.length > 0 && (
                <Sparkline
                  data={sparkline}
                  color={sparklineColor}
                  width={60}
                  height={24}
                  filled
                  className="shrink-0"
                />
              )}
            </div>
          )}

          {description && (
            <p className="mt-2 text-sm text-fg-3">{description}</p>
          )}
        </CardContent>
      </Card>
    );
  },
);
StatCard.displayName = 'StatCard';
