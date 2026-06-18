import * as React from 'react';
import { Card, CardContent, CardHeader } from '@venator-ui/ui';

export interface ChartCardLegendItem {
  label: string;
  /** Defaults to the chart series palette by position */
  color?: string;
}

export interface ChartCardProps {
  title: string;
  description?: string;
  chart: React.ReactNode;
  action?: React.ReactNode;
  /** Series legend rendered top-right; ignored when `action` is set */
  legend?: ChartCardLegendItem[];
  className?: string;
}

// Mirrors the AreaChart default series palette
const LEGEND_PALETTE = ['var(--fg)', 'var(--fg-3)'];

export function ChartCard({ title, description, chart, action, legend, className }: ChartCardProps) {
  const legendNode =
    legend && legend.length > 0 ? (
      <div className="flex items-center gap-3">
        {legend.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5 font-mono text-2xs text-fg-3">
            <span
              className="inline-block w-2 h-px"
              style={{ background: item.color ?? LEGEND_PALETTE[Math.min(i, LEGEND_PALETTE.length - 1)] }}
              aria-hidden="true"
            />
            {item.label}
          </span>
        ))}
      </div>
    ) : undefined;

  return (
    <Card className={className}>
      <CardHeader size="sm" title={title} description={description} action={action ?? legendNode} />
      <CardContent className="mt-3">
        {chart}
      </CardContent>
    </Card>
  );
}
