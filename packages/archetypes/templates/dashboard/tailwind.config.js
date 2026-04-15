const { venatorPreset } = require('@venator-ui/tokens');

module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './app/**/*.{ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx,md,mdx}',
  ],
  theme: { extend: {} },
  plugins: [],
};
