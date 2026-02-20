import type { ErrorRequestHandler } from 'express';

import { logger } from '../config/logger.js';
import { AppError } from '../utils/app-error.js';
import { sendError } from '../utils/response.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error({ err }, 'Non-operational error');
    }
    sendError(res, err.message, err.statusCode);
    return;
  }

  logger.error({ err }, 'Unhandled error');
  sendError(res, 'Internal server error', 500);
};
