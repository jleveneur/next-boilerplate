import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './actions';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  // Load the messages for the given locale.
  const messages = await import(`../../locales/${locale}.json`);

  return {
    locale,
    messages: messages.default,
  };
});
