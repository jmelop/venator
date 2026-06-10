'use client';

export interface BarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  showXAxis?: boolean;
  showGrid?: boolean;
  /** Bar height baseline: 'zero' keeps proportions, 'min' stretches min..max */
  baseline?: 'zero' | 'min';
  /** Scale each bar's opacity with its value for depth */
  opacityRamp?: boolean;
  className?: string;
}

const VIEW_W = 100;
const VIEW_H = 100;
const PAD_TOP = 8;
const X_AXIS_H = 20;
const BAR_RADIUS = 2;
const AXIS_FONT_SIZE = 10;
// See AreaChart: dash lengths are in horizontally-stretched viewBox units.
const GRID_DASH = '0.5 1';
const RAMP_BASE = 0.2;
const RAMP_SPAN = 0.5;
const FLAT_OPACITY = 0.85;

function roundedTopRect(x: number, y: number, w: number, h: number, r: number) {
  const cr = Math.min(r, w / 2, h);
  return [
    `M ${x + cr} ${y}`,
    `L ${x + w - cr} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + cr}`,
    `L ${x + w} ${y + h}`,
    `L ${x} ${y + h}`,
    `L ${x} ${y + cr}`,
    `Q ${x} ${y} ${x + cr} ${y}`,
    'Z',
  ].join(' ');
}

export function BarChart({
  data,
  color = 'currentColor',
  height = 160,
  showXAxis = true,
  showGrid = false,
  baseline = 'zero',
  opacityRamp = true,
  className,
}: BarChartProps) {
  if (!data || data.length === 0) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const base = baseline === 'zero' ? 0 : min;
  const range = max - base || 1;

  const chartH = VIEW_H - PAD_TOP;
  const slotW = VIEW_W / data.length;
  const barW = slotW / 1.2;

  const barX = (i: number) => i * slotW + (slotW - barW) / 2;
  const barH = (value: number) => Math.max(((value - base) / range) * chartH, 1);
  const barY = (value: number) => VIEW_H - barH(value);
  const barOpacity = (value: number) =>
    opacityRamp ? RAMP_BASE + (max > 0 ? value / max : 0) * RAMP_SPAN : FLAT_OPACITY;

  const chartAreaHeight = height - (showXAxis ? X_AXIS_H : 0);

  return (
    <div className={`relative w-full ${className ?? ''}`} style={{ height }}>
      <div className="absolute top-0 left-0 right-0" style={{ height: chartAreaHeight }}>
        <svg
          width="100%"
          height={chartAreaHeight}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {showGrid &&
            [25, 50, 75].map((pct) => {
              const y = VIEW_H - (pct / 100) * chartH;
              return (
                <line
                  key={pct}
                  x1={0} y1={y} x2={VIEW_W} y2={y}
                  stroke="var(--border-subtle)"
                  strokeWidth={1}
                  strokeDasharray={GRID_DASH}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

          {data.map((d, i) => (
            <path
              key={i}
              d={roundedTopRect(barX(i), barY(d.value), barW, barH(d.value), BAR_RADIUS)}
              fill={color}
              fillOpacity={barOpacity(d.value)}
            />
          ))}
        </svg>
      </div>

      {showXAxis && (
        <div className="absolute left-0 right-0" style={{ top: chartAreaHeight, height: X_AXIS_H }}>
          <div className="relative w-full h-full">
            {data.map((d, i) => {
              // Centered under each bar's slot, not spread edge-to-edge
              const pct = ((i + 0.5) / data.length) * 100;
              return (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 font-mono whitespace-nowrap"
                  style={{ left: `${pct}%`, fontSize: AXIS_FONT_SIZE, top: 4, color: 'var(--fg-4)' }}
                >
                  {d.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
