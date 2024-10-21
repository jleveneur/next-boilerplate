import { defineConfig } from 'drizzle-kit';

import { env } from '@/env/server';

export default defineConfig({
  out: './src/lib/drizzle/migrations',
  schema: './src/lib/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
