import Link from 'next/link';
import { Card } from '@venator-ui/ui';
import { PageHeader } from '@venator-ui/patterns';
import { ThemeToggle } from '../../../components/theme-toggle';

type Conversation = {
  id: string;
  title: string;
  snippet: string;
  timestamp: string;
  messages: number;
  active?: boolean;
};

// Mock history — swap this for your real data source.
const conversations: Conversation[] = [
  { id: 'c1', title: 'Key principles of good software architecture', snippet: 'Good architecture rests on a handful of enduring principles: separation of concerns, loose coupling, high cohesion…', timestamp: 'Today at 14:32', messages: 6, active: true },
  { id: 'c2', title: 'Explain the difference between REST and GraphQL', snippet: 'REST exposes a fixed set of resource endpoints and you compose data by calling several of them…', timestamp: 'Today at 11:05', messages: 4 },
  { id: 'c3', title: 'How do I optimise a slow SQL query with joins?', snippet: 'Start with the query plan, then attack the biggest cost: run EXPLAIN ANALYZE to find the sequential scans…', timestamp: 'Yesterday at 18:47', messages: 2 },
  { id: 'c4', title: 'TypeScript utility type for deep partial objects', snippet: 'Here’s a recursive DeepPartial that makes every nested property optional…', timestamp: 'Yesterday at 09:14', messages: 2 },
  { id: 'c5', title: 'Summarise the CAP theorem in simple terms', snippet: 'A distributed system can offer at most two of three guarantees: consistency, availability and partition tolerance…', timestamp: '12 Apr at 16:22', messages: 2 },
];

function MessageIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function HistoryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-10 pt-8">
      <PageHeader
        className="mb-5"
        title="Conversations"
        meta="5 saved sessions"
        actions={<ThemeToggle />}
      />

      <Card padding="none">
        {conversations.map((c, i) => (
          <Link
            key={c.id}
            href="/ai"
            className={`group flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-bg-2 ${
              i < conversations.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--border-subtle)] bg-bg-2 text-fg-3">
              <MessageIcon />
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-medium text-fg">{c.title}</span>
                {c.active && (
                  <span className="shrink-0 rounded-full bg-accent px-1.5 py-px text-2xs font-semibold text-accent-ink">Active</span>
                )}
              </span>
              <span className="mt-0.5 block truncate text-[13px] text-fg-3">{c.snippet}</span>
            </span>

            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="whitespace-nowrap text-xs text-fg-4">{c.timestamp}</span>
              <span className="text-2xs text-fg-4">
                {c.messages} {c.messages === 1 ? 'message' : 'messages'}
              </span>
            </span>

            <span className="shrink-0 text-fg-4 transition-colors group-hover:text-fg-3">
              <ChevronIcon />
            </span>
          </Link>
        ))}
      </Card>
    </div>
  );
}
