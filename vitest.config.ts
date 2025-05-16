import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './src/setupTests.ts',
      './src/setupAuth0Mock.ts',
      './src/setupReactRouterFutureFlags.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', '**/*.d.ts', 'src/setupTests.ts', 'src/setupAuth0Mock.ts'],
    },
  },
});
