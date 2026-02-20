import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { BadRequestError } from "../utils/AppError.js";

/**
 * Validates request body against a Zod schema.
 * Returns 400 with validation errors if invalid.
 */
export function validateRequest<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body) as T;
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`);
        next(new BadRequestError(messages.join("; ")));
      } else {
        next(err);
      }
    }
  };
}
