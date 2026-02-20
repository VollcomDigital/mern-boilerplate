export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
