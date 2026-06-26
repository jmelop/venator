'use client';

import { usePathname } from 'next/navigation';
import { SidebarNav } from '@venator-ui/patterns';
import Link from 'next/link';

const sections = [
  {
    label: 'Main',
    items: [
      { label: 'AI', href: '/ai' },
      { label: 'History', href: '/ai/history' },
    ],
  },
  {
    label: 'Config',
    items: [
      { label: 'Settings', href: '/ai/settings' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <SidebarNav
      sections={sections}
      pathname={pathname}
      linkComponent={Link}
      header={
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-md flex items-center justify-center bg-bg-3 shrink-0">
            <img src="https://www.venatorui.com/venator-logo-icon.png" alt="Venator" className="w-4 h-4 hidden dark:block" />
            <img src="https://www.venatorui.com/venator-logo-icon-light.png" alt="Venator" className="w-4 h-4 block dark:hidden" />
          </span>
          <span className="text-[13px] font-medium text-fg-2">Venator</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="ml-auto text-fg-4" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      }
    />
  );
}
