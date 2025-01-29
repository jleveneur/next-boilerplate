import { loadEnvConfig } from '@next/env';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Load environment variables from .env* files
const projectDirectory = process.cwd();
loadEnvConfig(projectDirectory);

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
