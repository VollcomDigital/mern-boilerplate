import type { RequestHandler } from 'express';

import { AppError } from '../utils/app-error.js';

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(AppError.notFound('Route not found'));
};
