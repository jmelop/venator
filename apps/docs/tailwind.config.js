const { venatorPreset } = require('@venator/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './src/**/*.{ts,tsx,md,mdx,css}',
    './mdx-components.tsx',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/ui/dist/**/*.{js,mjs}',
    '../../packages/patterns/src/**/*.{ts,tsx}',
    '../../packages/patterns/dist/**/*.{js,mjs}',
  ],
  safelist: [
    'dark:border-neutral-600',
    'dark:text-neutral-100',
    'dark:hover:bg-neutral-800',
    'dark:bg-neutral-800',
    'dark:bg-neutral-900',
    'dark:bg-neutral-950',
    'dark:text-neutral-400',
    'dark:border-neutral-800',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
