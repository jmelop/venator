'use client';

import { useState } from 'react';
import { Button, Select } from '@venator-ui/ui';

function ModeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function PaperclipIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export function ChatInput({ onSubmit }: { onSubmit?: (value: string, mode: string) => void }) {
  const [value, setValue] = useState('');
  const [mode, setMode] = useState('general');

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSubmit?.(text, mode);
    setValue('');
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pb-4">
      <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-bg-1 shadow-lg">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder="Ask anything about your architecture…"
          rows={2}
          className="block max-h-52 w-full resize-none border-0 bg-transparent px-4 pb-2 pt-4 text-base leading-relaxed text-fg outline-none placeholder:text-fg-4"
        />

        {/* Toolbar: Mode lives inside the composer (left), actions on the right */}
        <div className="flex items-center justify-between px-3 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 pl-1 text-xs font-medium text-fg-3">
              <ModeIcon />
              Mode
            </span>
            <Select size="sm" value={mode} onChange={(e) => setMode(e.target.value)} className="w-32">
              <option value="general">General</option>
              <option value="code">Code</option>
              <option value="analysis">Analysis</option>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" iconOnly aria-label="Attach file">
              <PaperclipIcon />
            </Button>
            <Button variant="primary" size="sm" iconOnly disabled={!value.trim()} onClick={submit} aria-label="Send message">
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-2.5 text-center text-xs text-fg-4">Venator AI can make mistakes. Verify important details.</p>
    </div>
  );
}
