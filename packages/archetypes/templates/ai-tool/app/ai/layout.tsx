'use client';

import { DashboardLayout } from '@venator-ui/patterns';
import { Sidebar } from '../../components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // No global topbar — each page carries its own header (the chat owns its
    // full height via contentPadding="p-0"; other pages use PageHeader).
    <DashboardLayout sidebar={<Sidebar />} contentPadding="p-0">
      {children}
    </DashboardLayout>
  );
}
