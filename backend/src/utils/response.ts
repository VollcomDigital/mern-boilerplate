import type { Response } from 'express';
import type { ApiResponse } from '@mern/shared';

export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const body: ApiResponse<T> = {
    success: true,
    data,
    error: null,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(body);
}

export function sendError(res: Response, message: string, statusCode = 500): void {
  const body: ApiResponse<null> = {
    success: false,
    data: null,
    error: message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(body);
}
