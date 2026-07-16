'use client';

import { useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Button } from '@venator-ui/ui';
import { ChatMessage, ChatRole } from '../../components/chat-message';
import { ChatInput } from '../../components/chat-input';

type Message = { id: number; role: ChatRole; content: string };

// Mock transcript — swap this for your model/backend.
const SEED: Message[] = [
  { id: 1, role: 'user', content: 'What are the key principles of good software architecture?' },
  {
    id: 2,
    role: 'assistant',
    content:
      'Good architecture rests on a handful of enduring principles:\n\n' +
      '• Separation of concerns — keep each module focused on a single responsibility so the system is easier to understand and change.\n' +
      '• Loose coupling — changes in one area shouldn’t cascade unpredictably through the rest of the codebase.\n' +
      '• High cohesion — keep related logic together to reduce the friction of navigating the system.\n' +
      '• Composition over inheritance — keep hierarchies shallow and behaviour explicit.\n\n' +
      'A good litmus test: if you can swap a component without touching its neighbours, your boundaries are probably right.',
  },
  { id: 3, role: 'user', content: 'Any rule of thumb for when GraphQL is overkill?' },
  {
    id: 4,
    role: 'assistant',
    content:
      'If you have a single client, a small number of endpoints, and predictable read patterns, GraphQL usually adds more machinery than it removes. Start with REST, and reach for GraphQL once client-driven querying or graph traversal becomes a recurring pain point.',
  },
];

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>(SEED);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the latest turn in view as the transcript grows.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  // Mock send — appends the message locally. Wire this to your model.
  const sendMessage = (content: string) => {
    setMessages((m) => [...m, { id: Date.now(), role: 'user', content }]);
  };

  const title = messages.length > 0 ? 'Software architecture' : 'New chat';

  return (
    <div className="flex h-full flex-col">
      {/* Conversation header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="truncate text-sm font-semibold text-fg">{title}</span>
          {messages.length > 0 && (
            <Badge variant="default" size="sm" dot>
              Saved
            </Badge>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setMessages([])}>
            New chat
          </Button>
          <Avatar size="sm" fallback="JL" />
        </div>
      </header>

      {/* Scrollable transcript */}
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 px-6 pb-6 pt-8">
            {messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}
          </div>
        )}
      </div>

      {/* Composer pinned to the bottom */}
      <div className="shrink-0">
        <ChatInput onSubmit={(content) => sendMessage(content)} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[340px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-bg-2 text-fg-3">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <p className="mb-1.5 text-lg font-semibold text-fg">How can I help?</p>
      <p className="max-w-xs text-sm leading-relaxed text-fg-3">
        Ask about architecture, APIs, databases or anything else. Pick a mode below to steer the answer.
      </p>
    </div>
  );
}
