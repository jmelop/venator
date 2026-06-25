import { ModuleGrid, PageHeader, StatCard } from '@venator-ui/patterns';
import {
  Card, CardContent, CardHeader, Avatar, Badge, Button, ButtonGroup,
  Progress, Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@venator-ui/ui';

const usersSparkline = [1180, 1196, 1188, 1212, 1224, 1236, 1248, 1257, 1264, 1271, 1279, 1284];
const activeSparkline = [54, 49, 57, 45, 59, 47, 52, 44, 50, 46, 48, 43];
const pendingSparkline = [5, 6, 5, 7, 8, 7, 9, 8, 10, 9, 11, 12];
const ticketsSparkline = [15, 13, 16, 12, 14, 11, 13, 10, 12, 9, 9, 7];

const approvals = [
  { initials: 'SC', name: 'Sarah Chen', request: 'Requesting Admin role', time: '2m' },
  { initials: 'JO', name: 'James Okafor', request: 'New workspace · Growth', time: '18m' },
  { initials: 'MK', name: 'Mia Karlsson', request: 'Export of audit logs', time: '1h' },
  { initials: 'LH', name: 'Luis Herrera', request: 'Seat increase to 300', time: '3h' },
];

const statusItems: { label: string; state: string; variant: 'success' | 'warning' | 'error' }[] = [
  { label: 'API', state: 'Operational', variant: 'success' },
  { label: 'Database', state: 'Operational', variant: 'success' },
  { label: 'Webhooks', state: 'Degraded', variant: 'warning' },
];

const activity: { name: string; action: string; status: string; variant: 'success' | 'warning' | 'error'; time: string }[] = [
  { name: 'Sarah Chen', action: 'Exported Q1 report', status: 'Success', variant: 'success', time: '2 min ago' },
  { name: 'James Okafor', action: 'Invited 3 team members', status: 'Success', variant: 'success', time: '14 min ago' },
  { name: 'Mia Karlsson', action: 'Deleted workspace backup', status: 'Warning', variant: 'warning', time: '1 hr ago' },
  { name: 'Luis Herrera', action: 'Connected Stripe integration', status: 'Success', variant: 'success', time: '3 hr ago' },
  { name: 'Priya Nair', action: 'Failed login attempt', status: 'Error', variant: 'error', time: '5 hr ago' },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <PageHeader
        className="mb-5"
        title="Overview"
        meta="Admin workspace · updated just now"
        actions={
          <ButtonGroup>
            <Button variant="ghost" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="accent" size="sm">Invite user</Button>
          </ButtonGroup>
        }
      />

      <ModuleGrid columns={4} className="mb-4">
        <StatCard title="Total users" value="1,284" trend={4.2} sparkline={usersSparkline} />
        <StatCard title="Active today" value="43" trend={-2.1} sparkline={activeSparkline} />
        <StatCard title="Pending review" value="12" trend={12} sparkline={pendingSparkline} />
        <StatCard title="Open tickets" value="7" trend={-15} sparkline={ticketsSparkline} />
      </ModuleGrid>

      <ModuleGrid columns={3} className="mb-4">
        <Card surface="raised" className="lg:col-span-2">
          <CardHeader title="Pending approvals" description="Requests waiting on an admin." />
          <CardContent className="mt-2">
            {approvals.map((row, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-subtle last:border-0">
                <Avatar size="sm" fallback={row.initials} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-fg truncate">{row.name}</div>
                  <div className="text-xs text-fg-3 truncate">{row.request}</div>
                </div>
                <span className="font-mono text-2xs text-fg-4 shrink-0">{row.time}</span>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm">Approve</Button>
                  <Button variant="ghost" size="sm">Deny</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card surface="raised">
          <CardHeader title="System status" description="All core services." />
          <CardContent className="mt-3 flex flex-col gap-4">
            {statusItems.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-[13px] text-fg-2">{s.label}</span>
                <Badge variant={s.variant} dot size="sm">{s.state}</Badge>
              </div>
            ))}
            <Separator />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-fg-2">Storage used</span>
                <span className="font-mono text-xs text-fg-3">64%</span>
              </div>
              <Progress value={64} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-fg-2">Last backup</span>
              <span className="font-mono text-xs text-fg-3">2h ago</span>
            </div>
          </CardContent>
        </Card>
      </ModuleGrid>

      <Card surface="raised">
        <CardHeader title="Recent activity" description="Latest events across the workspace." />
        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activity.map((a, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.action}</TableCell>
                  <TableCell><Badge variant={a.variant} size="sm">{a.status}</Badge></TableCell>
                  <TableCell className="text-fg-3">{a.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
