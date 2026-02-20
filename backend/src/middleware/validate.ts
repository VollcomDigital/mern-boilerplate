import type { RequestHandler } from 'express';
import { z } from 'zod';

import { AppError } from '../utils/app-error.js';

interface ValidationSchemas {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
}

export function validate(schemas: ValidationSchemas): RequestHandler {
  return (req, _res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const message = err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        next(AppError.badRequest(message));
        return;
      }
      next(err);
    }
  };
}
