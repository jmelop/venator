'use client';

import { useMemo, useState } from 'react';
import { PageHeader } from '@venator-ui/patterns';
import {
  Card, Avatar, Badge, Button, ButtonGroup, Input, Select,
  Tabs, TabsList, TabsTrigger,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@venator-ui/ui';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

type RoleVariant = 'primary' | 'default';
type StatusVariant = 'success' | 'warning' | 'error';

interface Member {
  initials: string;
  name: string;
  email: string;
  role: string;
  roleVariant: RoleVariant;
  status: 'Active' | 'Pending' | 'Suspended';
  statusVariant: StatusVariant;
  last: string;
  mfa: boolean;
}

const members: Member[] = [
  { initials: 'SC', name: 'Sarah Chen', email: 'sarah.chen@venator.app', role: 'Owner', roleVariant: 'primary', status: 'Active', statusVariant: 'success', last: '2 min ago', mfa: true },
  { initials: 'JO', name: 'James Okafor', email: 'james@venator.app', role: 'Admin', roleVariant: 'primary', status: 'Active', statusVariant: 'success', last: '1 hr ago', mfa: true },
  { initials: 'AW', name: 'Aisha Warsame', email: 'aisha.w@venator.app', role: 'Admin', roleVariant: 'primary', status: 'Active', statusVariant: 'success', last: '4 hr ago', mfa: true },
  { initials: 'MK', name: 'Mia Karlsson', email: 'mia.k@venator.app', role: 'Member', roleVariant: 'default', status: 'Active', statusVariant: 'success', last: '3 hr ago', mfa: true },
  { initials: 'LH', name: 'Luis Herrera', email: 'luis@venator.app', role: 'Billing', roleVariant: 'default', status: 'Active', statusVariant: 'success', last: 'Yesterday', mfa: false },
  { initials: 'TD', name: 'Tomas Dvorak', email: 'tomas@venator.app', role: 'Viewer', roleVariant: 'default', status: 'Pending', statusVariant: 'warning', last: 'Invited 2d ago', mfa: false },
  { initials: 'NF', name: 'Nadia Farouk', email: 'nadia.f@venator.app', role: 'Member', roleVariant: 'default', status: 'Pending', statusVariant: 'warning', last: 'Invited 5h ago', mfa: false },
  { initials: 'PN', name: 'Priya Nair', email: 'priya.nair@venator.app', role: 'Member', roleVariant: 'default', status: 'Suspended', statusVariant: 'error', last: '12 days ago', mfa: false },
];

export default function AdminUsersPage() {
  const [tab, setTab] = useState('all');

  const visible = useMemo(() => members.filter((u) => {
    if (tab === 'admins') return u.role === 'Owner' || u.role === 'Admin';
    if (tab === 'pending') return u.status === 'Pending';
    if (tab === 'suspended') return u.status === 'Suspended';
    return true;
  }), [tab]);

  return (
    <div>
      <PageHeader
        className="mb-5"
        title="Users"
        meta="284 members · 12 pending invites"
        actions={
          <ButtonGroup>
            <Button variant="ghost" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Export</Button>
            <Button variant="accent" size="sm">Invite user</Button>
          </ButtonGroup>
        }
      />

      <Card surface="raised">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Tabs value={tab} onValueChange={setTab} variant="pill">
            <TabsList>
              <TabsTrigger value="all">All · 284</TabsTrigger>
              <TabsTrigger value="admins">Admins · 8</TabsTrigger>
              <TabsTrigger value="pending">Pending · 12</TabsTrigger>
              <TabsTrigger value="suspended">Suspended · 3</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <div className="w-56">
              <Input size="sm" placeholder="Search members…" leftIcon={<SearchIcon />} aria-label="Search members" />
            </div>
            <div className="w-36">
              <Select size="sm" defaultValue="all">
                <option value="all">All roles</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Directory */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>MFA</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead aria-label="Actions" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm" fallback={u.initials} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-fg whitespace-nowrap">{u.name}</div>
                        <div className="font-mono text-xs text-fg-4 whitespace-nowrap">{u.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={u.roleVariant} size="sm">{u.role}</Badge></TableCell>
                  <TableCell><Badge variant={u.statusVariant} dot size="sm">{u.status}</Badge></TableCell>
                  <TableCell>
                    <span className={`font-mono text-xs ${u.mfa ? 'text-success' : 'text-fg-4'}`}>
                      {u.mfa ? 'Enabled' : 'Off'}
                    </span>
                  </TableCell>
                  <TableCell className="text-fg-3">{u.last}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-subtle">
          <span className="font-mono text-xs text-fg-4">Showing {visible.length} of 284 members</span>
          <ButtonGroup>
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  );
}
