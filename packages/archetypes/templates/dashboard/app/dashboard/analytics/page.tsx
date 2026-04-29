import { PageHeader, ModuleGrid, StatCard, ChartCard } from '@venator-ui/patterns';
import { AreaChart, BarChart } from '@venator-ui/ui';

const revenueSparkline = [88, 92, 85, 98, 94, 105, 110, 102, 118, 115, 122, 128];
const usersSparkline = [180, 195, 188, 210, 205, 220, 215, 232, 228, 240, 248, 249];
const sessionsSparkline = [720, 750, 735, 780, 760, 810, 830, 815, 855, 870, 880, 892];
const convSparkline = [3.8, 3.5, 3.9, 3.2, 3.6, 3.4, 3.3, 3.5, 3.2, 3.4, 3.5, 3.42];

const sessionLabels = ['Apr 01','Apr 03','Apr 05','Apr 07','Apr 09','Apr 11','Apr 13','Apr 15','Apr 17'];
const sessionThisPeriod = [18, 24, 31, 27, 38, 35, 44, 52, 48, 61, 57, 69, 74, 81, 88, 92, 85];
const sessionPrevPeriod = [10, 14, 18, 16, 22, 20, 26, 30, 28, 35, 33, 40, 43, 47, 51, 54, 50];

const signupData = [
  { label: 'M', value: 48 },
  { label: 'T', value: 62 },
  { label: 'W', value: 71 },
  { label: 'T', value: 58 },
  { label: 'F', value: 80 },
  { label: 'S', value: 91 },
  { label: 'S', value: 67 },
];

const sessionSeriesData = sessionLabels.map((label, i) => ({ label, value: sessionThisPeriod[i] ?? 0 }));
const sessionPrevData = sessionLabels.map((label, i) => ({ label, value: sessionPrevPeriod[i] ?? 0 }));

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Last 30 days · updated just now"
      />
      <ModuleGrid columns={4}>
        <StatCard title="Revenue" value="$128,402" trend={12.4} variant="success" sparkline={revenueSparkline} />
        <StatCard title="Active users" value="24,891" trend={8.1} variant="primary" sparkline={usersSparkline} />
        <StatCard title="Sessions" value="89,233" trend={4.7} sparkline={sessionsSparkline} />
        <StatCard title="Conv. rate" value="3.42%" trend={-0.6} variant="error" sparkline={convSparkline} />
      </ModuleGrid>
      <ModuleGrid columns={2}>
        <ChartCard
          title="Sessions over time"
          description="Apr 01 – Apr 17 · 2026"
          chart={
            <AreaChart
              series={[
                { label: 'This period', data: sessionSeriesData, color: '#ffffff' },
                { label: 'Previous', data: sessionPrevData, color: '#6b7280' },
              ]}
              showXAxis
              showYAxis
              showGrid
              height={180}
            />
          }
        />
        <ChartCard
          title="Sign-ups / day"
          description="Weekly average · 62"
          chart={
            <BarChart
              data={signupData}
              color="#6b7280"
              showXAxis
              showGrid
              height={180}
            />
          }
        />
      </ModuleGrid>
    </div>
  );
}
