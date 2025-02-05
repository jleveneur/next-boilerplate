'use server';

import { type User } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

import { createAdminClient } from '@/lib/supabase/server';
import { handleError } from '@/lib/utils';
import { ApiResponse } from '@/types/api';

import {
  CreateUserFormData,
  createUserSchema,
  UpdateUserFormData,
  updateUserSchema,
} from './validation';

/**
 * Fetches a list of users from the Supabase admin client.
 *
 * @returns - A promise that resolves to an ApiResponse containing the list of users.
 */
export async function getUsers(): Promise<ApiResponse<{ users: User[] }>> {
  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) throw error;

    return { success: true, data: { users: data.users } };
  } catch (error) {
    return handleError(error, 'Failed to fetch users.', { users: [] });
  }
}

/**
 * Fetches a user by their ID from the Supabase admin client.
 *
 * @param userId - The ID of the user to fetch.
 * @returns - A promise that resolves to an ApiResponse containing the user data.
 */
export async function getUser(userId: string): Promise<ApiResponse<{ user: User | null }>> {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) throw error;

    return { success: true, data: { user: data.user } };
  } catch (error) {
    return handleError(error, `Failed to fetch user with ID ${userId}.`, { user: null });
  }
}

/**
 * Creates a new user using the Supabase admin client.
 *
 * @param formData - The form data to create the user with.
 * @returns - A promise that resolves to an ApiResponse containing the created user.
 */
export async function createUser(
  formData: CreateUserFormData
): Promise<ApiResponse<{ user: User | null }>> {
  const validatedFields = createUserSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields',
      data: { user: null },
    };
  }

  try {
    const supabase = await createAdminClient();
    const { email, password, fullName, role } = validatedFields.data;

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role },
    });

    if (error) throw error;

    revalidatePath('/users');

    return { success: true, message: 'User created successfully', data: { user: data.user } };
  } catch (error) {
    return handleError(error, 'Failed to create user.', { user: null });
  }
}

/**
 * Updates a user using the Supabase admin client.
 *
 * @param userId - The ID of the user to update.
 * @param formData - The form data to update the user with.
 * @returns - A promise that resolves to an ApiResponse containing the updated user.
 */
export async function updateUser(
  userId: string,
  formData: UpdateUserFormData
): Promise<ApiResponse<{ user: User | null }>> {
  const validatedFields = updateUserSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields',
      data: { user: null },
    };
  }

  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      email: validatedFields.data.email,
      user_metadata: {
        full_name: validatedFields.data.fullName,
        role: validatedFields.data.role,
      },
    });

    if (error) throw error;

    revalidatePath('/users');

    return {
      success: true,
      message: 'User updated successfully',
      data: { user: data.user },
    };
  } catch (error) {
    return handleError(error, `Failed to update user with ID ${userId}.`, { user: null });
  }
}

/**
 * Deletes a user using the Supabase admin client.
 *
 * @param userId - The ID of the user to delete.
 * @returns - A promise that resolves to an ApiResponse.
 */
export async function deleteUser(userId: string): Promise<ApiResponse<null>> {
  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) throw error;

    revalidatePath('/users');

    return { success: true, message: 'User deleted successfully', data: null };
  } catch (error) {
    return handleError(error, `Failed to delete user with ID ${userId}.`, null);
  }
}
