import { Avatar } from '@venator-ui/ui';

export type ChatRole = 'user' | 'assistant';

/**
 * A single conversation turn.
 * - assistant: left-aligned, flows on the page background with a square brand avatar
 * - user: right-aligned bubble on the bg-2 surface with a circular initials avatar
 */
export function ChatMessage({ role, content }: { role: ChatRole; content: string }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end py-2.5">
        <div className="flex max-w-[80%] flex-row-reverse items-start gap-3">
          <Avatar size="sm" fallback="JL" className="mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="mb-1.5 text-right text-xs font-semibold text-fg-3">You</p>
            <div className="whitespace-pre-wrap rounded-2xl rounded-tr-md border border-[var(--border-subtle)] bg-bg-2 px-4 py-3 text-base leading-relaxed text-fg [overflow-wrap:anywhere]">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3.5 py-2.5">
      <Avatar
        size="sm"
        shape="square"
        src="https://www.venatorui.com/venator-logo-icon.png"
        alt="Venator AI"
        fallback="AI"
        className="mt-0.5 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-xs font-semibold text-fg-3">Venator AI</p>
        <div className="whitespace-pre-wrap text-base leading-relaxed text-fg-2 [overflow-wrap:anywhere]">
          {content}
        </div>
      </div>
    </div>
  );
}
