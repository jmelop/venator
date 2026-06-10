'use client';

import * as React from 'react';

export interface AreaSeries {
  label: string;
  data: { label: string; value: number }[];
  color?: string;
}

export interface AreaChartProps {
  data?: { label: string; value: number }[];
  series?: AreaSeries[];
  color?: string;
  height?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  /** Area fill treatment under each line */
  fill?: 'gradient' | 'flat' | 'none';
  /** Y domain; 'nice' = 0 up to the data max rounded to a tick-friendly ceiling */
  domain?: [number, number] | 'nice';
  /** Maximum number of X axis labels rendered */
  maxXLabels?: number;
  className?: string;
}

const Y_AXIS_W = 28;
const X_AXIS_H = 20;
const PAD_TOP = 8;
const CHART_W = 100;
const CHART_H = 100;
const TICK_SEGMENTS = 4;
const AXIS_FONT_SIZE = 10;
// Dash lengths are in viewBox units (stretched horizontally by
// preserveAspectRatio="none"); 0.5/1 renders as roughly 2/4 px dashes at
// typical card widths, matching the reference dash rhythm.
const GRID_DASH = '0.5 1';
// Default per-series treatment: primary series first, comparison series after.
const SERIES_STYLE = [
  { color: 'var(--fg)', strokeWidth: 1.8, gradientStart: 0.4 },
  { color: 'var(--fg-3)', strokeWidth: 1.5, gradientStart: 0.2 },
] as const;

function niceCeil(value: number): number {
  if (value <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(value)));
  const norm = value / mag;
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return nice * mag;
}

function formatTick(value: number): string {
  return String(Math.round(value * 10) / 10);
}

export function AreaChart({
  data,
  series,
  color,
  height = 160,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  fill = 'gradient',
  domain = 'nice',
  maxXLabels = 6,
  className,
}: AreaChartProps) {
  const gradientId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');

  // Normalise to series format
  const allSeries: AreaSeries[] = series
    ? series
    : data && data.length > 0
    ? [{ label: 'default', data, color }]
    : [];

  if (allSeries.length === 0) return null;

  const styleFor = (si: number) => SERIES_STYLE[Math.min(si, SERIES_STYLE.length - 1)];
  const colorFor = (si: number) => allSeries[si].color ?? styleFor(si).color;

  const allValues = allSeries.flatMap((s) => s.data.map((d) => d.value));
  const dataMax = Math.max(...allValues);
  const [min, max] = domain === 'nice' ? [0, niceCeil(dataMax)] : domain;
  const range = max - min || 1;

  const labels = allSeries[0].data.map((d) => d.label);
  const n = labels.length;

  const toX = (i: number) => (n === 1 ? CHART_W / 2 : (i / (n - 1)) * CHART_W);
  const toY = (value: number) =>
    CHART_H - ((value - min) / range) * (CHART_H - PAD_TOP);

  const ticks = Array.from(
    { length: TICK_SEGMENTS + 1 },
    (_, i) => min + (range / TICK_SEGMENTS) * i,
  );

  // X labels: points carrying a non-empty label, capped at maxXLabels
  const labeled = labels
    .map((label, i) => ({ label, i }))
    .filter((x) => x.label != null && x.label !== '');
  const step = Math.ceil(labeled.length / Math.max(maxXLabels, 1));
  const xLabels =
    labeled.length > maxXLabels
      ? labeled.filter((_, j) => j % step === 0 || j === labeled.length - 1)
      : labeled;

  // Layout: chart area + optional axes rendered with HTML div wrapper
  // to avoid text distortion from preserveAspectRatio="none"
  const chartAreaHeight = height - (showXAxis ? X_AXIS_H : 0);

  return (
    <div className={`relative w-full ${className ?? ''}`} style={{ height }}>
      {/* Y axis labels — absolute left, not inside the scaled SVG */}
      {showYAxis && (
        <div
          className="absolute left-0 top-0 pointer-events-none"
          style={{ width: Y_AXIS_W, height: chartAreaHeight }}
        >
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute right-1.5 font-mono"
              style={{
                top: `${(toY(t) / CHART_H) * 100}%`,
                transform: 'translateY(-50%)',
                fontSize: AXIS_FONT_SIZE,
                lineHeight: 1,
                color: 'var(--fg-4)',
              }}
            >
              {formatTick(t)}
            </span>
          ))}
        </div>
      )}

      {/* Chart SVG */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: showYAxis ? Y_AXIS_W : 0, right: 0 }}
      >
        <svg
          width="100%"
          height={chartAreaHeight}
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {fill === 'gradient' && (
            <defs>
              {allSeries.map((_, si) => (
                <linearGradient
                  key={si}
                  id={`${gradientId}-s${si}`}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={colorFor(si)} stopOpacity={styleFor(si).gradientStart} />
                  <stop offset="100%" stopColor={colorFor(si)} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
          )}

          {showGrid &&
            ticks.map((t) => {
              const y = toY(t);
              return (
                <line
                  key={t}
                  x1={0} y1={y} x2={CHART_W} y2={y}
                  stroke="var(--border-subtle)"
                  strokeWidth={1}
                  strokeDasharray={GRID_DASH}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

          {/* Painted last-to-first so the primary series sits on top */}
          {allSeries
            .map((s, si) => ({ s, si }))
            .reverse()
            .map(({ s, si }) => {
              const pts = s.data.map((d, i) => ({ x: toX(i), y: toY(d.value) }));
              const seriesColor = colorFor(si);

              const linePath = pts
                .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
                .join(' ');

              const areaPath = [
                `M${pts[0].x},${CHART_H}`,
                ...pts.map((p) => `L${p.x},${p.y}`),
                `L${pts[pts.length - 1].x},${CHART_H}`,
                'Z',
              ].join(' ');

              return (
                <g key={si}>
                  {fill !== 'none' && (
                    <path
                      d={areaPath}
                      fill={fill === 'gradient' ? `url(#${gradientId}-s${si})` : seriesColor}
                      fillOpacity={fill === 'flat' ? 0.15 : 1}
                      stroke="none"
                    />
                  )}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={seriesColor}
                    strokeWidth={styleFor(si).strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
        </svg>

        {/* X axis labels — plain HTML, no distortion; first/last clamped inside */}
        {showXAxis && (
          <div className="relative w-full" style={{ height: X_AXIS_H }}>
            {xLabels.map(({ label, i }) => {
              const pct = n === 1 ? 50 : (i / (n - 1)) * 100;
              const transform =
                pct < 5 ? 'none' : pct > 95 ? 'translateX(-100%)' : 'translateX(-50%)';
              return (
                <span
                  key={i}
                  className="absolute font-mono whitespace-nowrap"
                  style={{
                    left: `${pct}%`,
                    transform,
                    fontSize: AXIS_FONT_SIZE,
                    top: 4,
                    color: 'var(--fg-4)',
                  }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
