import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
          })
        );
      }
    }
  ],  server: {
    port: 5173,
    open: true,
    fs: { allow: ['.'] },
    host: true, // Add this to allow access from all network interfaces
  },
  build: {
    outDir: 'build'
  },
});
