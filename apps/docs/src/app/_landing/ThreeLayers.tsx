'use client';

import { LAYERS } from './constants';

const LAYER_ICONS = [
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.2M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/></svg>,
];

export function ThreeLayers() {
  return (
    <section style={{ borderTop: '1px solid var(--line)' }} className="px-6 py-20">
      <div className="max-w-[1200px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--fg-4)' }}>
          Architecture · 01
        </p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-medium tracking-tight leading-tight mb-3">
          <span style={{ color: 'var(--fg)' }}>Three layers.</span><br />
          <span style={{ color: 'var(--fg-4)' }}>Adopt any one of them.</span>
        </h2>
        <p className="text-[15px] max-w-[560px] mb-12 leading-relaxed" style={{ color: 'var(--fg-4)' }}>
          A strict, one-way dependency chain: ui → patterns → architectures.
          Each layer works on its own. None of them force the next.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.pkg}
              className="rounded-xl p-7 flex flex-col gap-4"
              style={{ background: 'var(--bg-1)', border: '1px solid var(--line-2)' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center"
                  style={{ border: '1px solid var(--line-2)', color: 'var(--fg-3)' }}
                >
                  {LAYER_ICONS[i]}
                </div>
                <span className="font-mono text-[10.5px]" style={{ color: 'var(--fg-5)' }}>{layer.index}</span>
              </div>
              <div>
                <p className="font-mono text-[12px] mb-2" style={{ color: 'var(--fg-4)' }}>{layer.pkg}</p>
                <p className="text-[15px] font-medium mb-2 tracking-tight" style={{ color: 'var(--fg)' }}>{layer.title}</p>
                <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-4)' }}>{layer.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--line)' }}>
                <span className="font-mono text-[11px]" style={{ color: 'var(--fg-4)' }}>{layer.meta}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-5)' }}>
                  <path d="M7 17L17 7M8 7h9v9"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
