import { drizzle } from 'drizzle-orm/node-postgres';

import { env } from '@/env/server';

export const database = drizzle(env.DATABASE_URL);
