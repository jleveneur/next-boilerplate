import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true, // This is needed by @testing-library to be cleaned up after each test
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/**/*.stories.{js,jsx,ts,tsx}', '**/*.d.ts'],
    },
    setupFiles: ['./vitest-setup.ts'],
  },
});
