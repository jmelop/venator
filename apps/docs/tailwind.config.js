const tokens = require('@venator/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/patterns/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        neutral: tokens.colors.neutral,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        error: tokens.colors.error,
      },
    },
  },
  plugins: [],
};
