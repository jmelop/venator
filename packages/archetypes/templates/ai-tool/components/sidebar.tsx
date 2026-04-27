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
      title="AI Tool"
      logo={
        <span className="block w-7 h-7 flex-shrink-0">
          <img src="https://www.venatorui.com/venator-logo-icon.png" alt="Venator" className="w-7 h-7 rounded-lg hidden dark:block" />
          <img src="https://www.venatorui.com/venator-logo-icon-light.png" alt="Venator" className="w-7 h-7 rounded-lg block dark:hidden" />
        </span>
      }
    />
  );
}
