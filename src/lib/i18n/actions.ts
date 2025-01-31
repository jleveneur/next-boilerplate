'use server';

import { cookies, headers } from 'next/headers';

import { defaultLocale, type Locale, locales } from './config';

const COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Retrieves the user's locale from cookies or headers.
 *
 * @returns The user's locale as a string.
 */
export async function getUserLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get(COOKIE_NAME)?.value as Locale;

    if (cookieLocale) return cookieLocale;

    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');

    if (acceptLanguage) {
      const languages = acceptLanguage.split(',').map((lang) => lang.split(';')[0]);

      for (const lang of languages) {
        if (locales.includes(lang as Locale)) return lang as Locale;
      }
    }

    return defaultLocale;
  } catch (error) {
    console.error('Error retrieving user locale:', error);
    return defaultLocale;
  }
}

/**
 * Sets the user's locale in cookies.
 *
 * @param locale - The locale to set for the user.
 */
export async function setUserLocale(locale: Locale): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, locale);
  } catch (error) {
    console.error('Error setting user locale:', error);
  }
}
