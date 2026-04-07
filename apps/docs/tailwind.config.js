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
  theme: {
    extend: {},
  },
  plugins: [],
};
