import type { Response } from "express";
import type { ApiResponse } from "@mern-boilerplate/shared";

/**
 * Standard JSON response helpers.
 * Ensures consistent API contract across all endpoints.
 */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const body: ApiResponse<T> = {
    success: true,
    data,
    error: null,
  };
  res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode = 500): void {
  const body: ApiResponse<null> = {
    success: false,
    data: null,
    error: message,
  };
  res.status(statusCode).json(body);
}
