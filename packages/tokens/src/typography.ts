export const typography = {
  fontFamily: {
    // The var() hooks bind to the next/font-loaded Geist faces (see the
    // `geist` package); the literal family + system stack remain as
    // fallbacks for consumers that don't load the fonts.
    sans: 'var(--font-geist-sans, "Geist"), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'var(--font-geist-mono, "Geist Mono"), ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  fontSize: {
    '2xs': '0.6875rem',
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;
