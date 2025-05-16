import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 5173,
    host: true,
    fs: { allow: ['.'] }
  },
  optimizeDeps: {
    include: ['**/*.ts', '**/*.tsx'] // Force TS processing
  }
});