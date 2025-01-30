'use server';

import { type User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';

import { loginSchema } from './schemas';

type AuthError = {
  error?: string;
};

/**
 * Logs in a user using the provided form data.
 *
 * @param formData - The form data containing the user's login credentials.
 * @returns An object containing an error message if the login fails, otherwise an empty object.
 */
export async function login(formData: z.infer<typeof loginSchema>): Promise<AuthError> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword(formData);

    if (error) {
      console.error('Login error:', error.message);
      return { error: error.message };
    }
  } catch (error) {
    console.error('Unexpected error during login:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }

  redirect('/');
}

/**
 * Logs out the current user.
 *
 * Redirects the user to the login page after logging out. If an error occurs during logout,
 * the user is redirected to the login page with an error message.
 */
export async function logout(): Promise<AuthError> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });

    if (error) {
      console.error('Logout error:', error.message);
      return { error: error.message };
    }
  } catch (error) {
    console.error('Unexpected error during logout:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }

  redirect('/login');
}

/**
 * Retrieves the currently authenticated user.
 *
 * @returns A promise that resolves to the user response object containing user information.
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
