import * as React from 'react';
import { NavGroup, NavItem } from '@venator-ui/ui';

export interface SidebarNavItem {
  label: string;
  href: string;
}

export interface SidebarNavSection {
  label: string;
  items: SidebarNavItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface SidebarNavProps {
  sections: SidebarNavSection[];
  pathname: string;
  logo?: React.ReactNode;
  title?: string;
  titleHref?: string;
  /** Custom header content (e.g. a workspace switcher); replaces logo/title */
  header?: React.ReactNode;
  /** Vertical rhythm passed to nav items */
  density?: 'compact' | 'comfortable';
  linkComponent?: React.ElementType;
  className?: string;
}

export function SidebarNav({
  sections,
  pathname,
  logo,
  title,
  titleHref = '/',
  header,
  density = 'compact',
  linkComponent: LinkComponent = 'a',
  className = '',
}: SidebarNavProps) {
  return (
    <nav className={`flex flex-col gap-4 p-3 ${className}`.trim()}>
      {header ? (
        <div className="px-2 pb-3 mb-1 border-b border-[var(--border-subtle)]">
          {header}
        </div>
      ) : (
        (logo || title) && (
          <div className="px-3 py-4 border-b border-[var(--border-subtle)] mb-2">
            <LinkComponent href={titleHref} className="flex items-center gap-2.5">
              {logo}
              {title && (
                <span className="text-[13px] font-medium text-fg-2">
                  {title}
                </span>
              )}
            </LinkComponent>
          </div>
        )
      )}

      {sections.map((section) => (
        <NavGroup key={section.label} label={section.label}>
          {section.items.map((item) => (
            <LinkComponent key={item.href} href={item.href} className="block">
              <NavItem label={item.label} active={pathname === item.href} density={density} />
            </LinkComponent>
          ))}
        </NavGroup>
      ))}
    </nav>
  );
}
