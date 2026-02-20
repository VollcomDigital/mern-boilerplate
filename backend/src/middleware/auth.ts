import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthTokenPayload } from '@mern/shared';

import { env } from '../config/env.js';
import { AppError } from '../utils/app-error.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

export const authenticate: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.['token'] as string | undefined;

  if (!token) {
    next(AppError.unauthorized('Authentication required'));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
    req.user = decoded;
    next();
  } catch {
    next(AppError.unauthorized('Invalid or expired token'));
  }
};

export function authorize(...roles: string[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) {
      next(AppError.unauthorized());
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(AppError.forbidden('Insufficient permissions'));
      return;
    }

    next();
  };
}
