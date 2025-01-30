import * as Sentry from '@sentry/nextjs';

import { env } from './lib/env';

export async function register() {
  if (env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      // Sentry DSN
      dsn: env.NEXT_PUBLIC_SENTRY_DSN,

      // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }

  if (env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      // Sentry DSN
      dsn: env.NEXT_PUBLIC_SENTRY_DSN,

      // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
