import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Centralized error-handling middleware.
 * Logs errors and returns consistent JSON responses.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Required by Express error middleware signature
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    logger.warn({ statusCode: err.statusCode, message: err.message }, "AppError");
    sendError(res, err.message, err.statusCode);
    return;
  }

  logger.error({ err }, "Unhandled error");
  sendError(
    res,
    process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
    500
  );
}
