import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type ApiResponse } from '@/types/api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles an error by logging it and returning a standardized API response.
 *
 * @template T - The type of the data to be returned in the response.
 * @param {unknown} error - The error that occurred.
 * @param {string} defaultMessage - The default message to use if the error is not an instance of Error.
 * @param {T} data - The data to be included in the response.
 * @returns {ApiResponse<T>} - The standardized API response containing the error message and data.
 */
export function handleError<T>(error: unknown, defaultMessage: string, data: T): ApiResponse<T> {
  console.error(defaultMessage, error);

  return {
    success: false,
    message: error instanceof Error ? error.message : defaultMessage,
    data,
  };
}
