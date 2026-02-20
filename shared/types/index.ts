/**
 * Shared types across frontend and backend.
 * Enables end-to-end type safety for API contracts.
 */

/** Standard API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Paginated API response */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: PaginationMeta;
}

/** User entity (sanitized for client) */
export interface UserPublic {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}
