const { venatorPreset } = require('@venator-ui/tokens');

module.exports = {
  darkMode: 'class',
  presets: [venatorPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@venator-ui/ui/dist/index.mjs',
    './node_modules/@venator-ui/patterns/dist/index.mjs',
  ],
  theme: { extend: {} },
  plugins: [],
};
