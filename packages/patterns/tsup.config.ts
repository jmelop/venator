import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  banner: { js: "'use client';" },
  external: ['react', 'react-dom'],
});
