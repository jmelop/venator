'use client';

import { AreaChart, BarChart, Button, ButtonGroup } from '@venator-ui/ui';
import { ChartCard, DashboardLayout, ModuleGrid, PageHeader, SidebarNav, StatCard } from '@venator-ui/patterns';
import { STATS } from './constants';

// Label only the dates shown on the X axis; unlabeled points stay unlabeled
const SESSION_LABELS: Record<number, string> = {
  0: 'Apr 01', 6: 'Apr 05', 12: 'Apr 09', 18: 'Apr 13', 24: 'Apr 17',
};

const THIS_PERIOD = [12, 18, 15, 22, 28, 24, 32, 38, 34, 42, 48, 45, 52, 58, 54, 62, 68, 64, 72, 78, 74, 82, 78, 85, 88]
  .map((value, i) => ({ label: SESSION_LABELS[i] ?? '', value }));

const PREVIOUS_PERIOD = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56]
  .map((value, i) => ({ label: SESSION_LABELS[i] ?? '', value }));

const SIGNUPS = [
  { label: 'M', value: 42 },
  { label: 'T', value: 58 },
  { label: 'W', value: 66 },
  { label: 'T', value: 72 },
  { label: 'F', value: 54 },
  { label: 'S', value: 80 },
  { label: 'S', value: 68 },
];

const SIDEBAR_SECTIONS = [
  {
    label: 'Workspace',
    items: [
      { label: 'Overview', href: '#overview' },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Customers', href: '#customers' },
      { label: 'Products', href: '#products' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Preferences', href: '#preferences' },
      { label: 'Notifications', href: '#notifications' },
      { label: 'Billing', href: '#billing' },
    ],
  },
];

function WorkspaceSwitcher() {
  return (
    <div className="flex items-center gap-2">
      <span className="w-7 h-7 rounded-md flex items-center justify-center bg-bg-3 shrink-0">
        <img src="/venator-logo-icon.png" alt="" className="w-4 h-4" />
      </span>
      <span className="text-[13px] font-medium text-fg-2">Venator</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="ml-auto text-fg-4" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function HeaderActions() {
  return (
    <ButtonGroup>
      <Button variant="ghost" size="sm">Filter</Button>
      <Button variant="outline" size="sm">Export</Button>
      <Button variant="accent" size="sm">New report</Button>
    </ButtonGroup>
  );
}

function AnalyticsContent() {
  return (
    <>
      <PageHeader
        className="mb-5"
        title="Analytics"
        meta="Last 30 days · updated just now"
        actions={<HeaderActions />}
      />
      <ModuleGrid columns={4} className="mb-4">
        {STATS.map((s) => (
          <StatCard key={s.label} title={s.label} value={s.value} trend={s.trend} sparkline={[...s.data]} />
        ))}
      </ModuleGrid>
      <ModuleGrid columns={3}>
        <ChartCard
          className="lg:col-span-2"
          title="Sessions over time"
          description="Apr 01 – Apr 17 · 2026"
          legend={[{ label: 'This period' }, { label: 'Previous' }]}
          chart={
            <AreaChart
              series={[
                { label: 'This period', data: THIS_PERIOD },
                { label: 'Previous', data: PREVIOUS_PERIOD },
              ]}
              height={200}
            />
          }
        />
        <ChartCard
          title="Sign-ups / day"
          description="Weekly average · 62"
          chart={<BarChart data={SIGNUPS} height={170} />}
        />
      </ModuleGrid>
    </>
  );
}

export function DashboardPreview() {
  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)' }} className="px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
          Archetypes · 02
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3">
          <span style={{ color: 'var(--fg)' }}>Run the CLI.</span><br />
          <span style={{ color: 'var(--fg-4)' }}>Ship this on Monday.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          One command scaffolds a complete architecture. Sidebar navigation, header, module grid, tokens wired in. The output is yours: extend it, delete half of it, it's code, not config.
        </p>

        {/* Browser frame */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-default)', background: 'var(--bg-1)', boxShadow: '0 60px 120px -40px rgba(0,0,0,0.3)' }}>
          {/* Chrome bar */}
          <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 rounded-md px-3 py-1 font-mono text-[11.5px]" style={{ background: 'var(--bg-2)', border: '1px solid var(--border-subtle)', color: 'var(--fg-3)' }}>
              <span style={{ color: 'var(--fg-4)' }}>https://</span>dashboard.venator.app<span style={{ color: 'var(--fg-4)' }}>/analytics</span>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              </Button>
              <Button variant="ghost" size="sm">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>
              </Button>
            </div>
          </div>

          {/* Desktop: the real dashboard composition, on the published components */}
          <div className="hidden lg:block">
            <DashboardLayout
              fullHeight={false}
              sidebarWidth="220px"
              contentPadding="p-7"
              sidebar={
                <SidebarNav
                  header={<WorkspaceSwitcher />}
                  sections={SIDEBAR_SECTIONS}
                  pathname="#analytics"
                />
              }
            >
              <AnalyticsContent />
            </DashboardLayout>
          </div>

          {/* Mobile/tablet: simplified view with stats and sessions chart */}
          <div className="lg:hidden p-4">
            <PageHeader className="mb-3" title="Analytics" meta="Last 30 days · updated just now" />
            <div className="grid grid-cols-2 gap-2">
              {STATS.map((s) => (
                <StatCard key={s.label} title={s.label} value={s.value} trend={s.trend} />
              ))}
            </div>
            <div className="mt-3">
              <ChartCard
                title="Sessions over time"
                description="Apr 01 – Apr 17"
                chart={
                  <AreaChart
                    data={THIS_PERIOD}
                    height={80}
                    showXAxis={false}
                    showYAxis={false}
                    showGrid={false}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
