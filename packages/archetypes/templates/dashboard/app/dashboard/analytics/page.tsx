import { PageHeader, ModuleGrid, StatCard, ChartCard } from '@venator-ui/patterns';
import { AreaChart, BarChart, Button, ButtonGroup } from '@venator-ui/ui';

const revenueSparkline = [88, 92, 85, 98, 94, 105, 110, 102, 118, 115, 122, 128];
const usersSparkline = [180, 195, 188, 210, 205, 220, 215, 232, 228, 240, 248, 249];
const sessionsSparkline = [720, 750, 735, 780, 760, 810, 830, 815, 855, 870, 880, 892];
const convSparkline = [3.8, 3.5, 3.9, 3.2, 3.6, 3.4, 3.3, 3.5, 3.2, 3.4, 3.5, 3.42];

// Label only the dates shown on the X axis; unlabeled points stay unlabeled
const sessionLabels: Record<number, string> = {
  0: 'Apr 01', 6: 'Apr 05', 12: 'Apr 09', 18: 'Apr 13', 24: 'Apr 17',
};

const thisPeriod = [12, 18, 15, 22, 28, 24, 32, 38, 34, 42, 48, 45, 52, 58, 54, 62, 68, 64, 72, 78, 74, 82, 78, 85, 88]
  .map((value, i) => ({ label: sessionLabels[i] ?? '', value }));

const previousPeriod = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56]
  .map((value, i) => ({ label: sessionLabels[i] ?? '', value }));

const signupData = [
  { label: 'M', value: 42 },
  { label: 'T', value: 58 },
  { label: 'W', value: 66 },
  { label: 'T', value: 72 },
  { label: 'F', value: 54 },
  { label: 'S', value: 80 },
  { label: 'S', value: 68 },
];

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        className="mb-5"
        title="Analytics"
        meta="Last 30 days · updated just now"
        actions={
          <ButtonGroup>
            <Button variant="ghost" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="accent" size="sm">New report</Button>
          </ButtonGroup>
        }
      />
      <ModuleGrid columns={4} className="mb-4">
        <StatCard title="Revenue" value="$128,402" trend={12.4} sparkline={revenueSparkline} />
        <StatCard title="Active users" value="24,891" trend={8.1} sparkline={usersSparkline} />
        <StatCard title="Sessions" value="89,233" trend={4.7} sparkline={sessionsSparkline} />
        <StatCard title="Conv. rate" value="3.42%" trend={-0.6} sparkline={convSparkline} />
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
                { label: 'This period', data: thisPeriod },
                { label: 'Previous', data: previousPeriod },
              ]}
              height={200}
            />
          }
        />
        <ChartCard
          title="Sign-ups / day"
          description="Weekly average · 62"
          chart={<BarChart data={signupData} height={170} />}
        />
      </ModuleGrid>
    </div>
  );
}
