import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

// Augment Express Request for authenticated routes
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

/**
 * JWT authentication middleware.
 * Expects token in HttpOnly cookie or Authorization header.
 */
export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const token = req.cookies?.token ?? req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    next(new UnauthorizedError("No token provided"));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    logger.debug({ err }, "Invalid JWT");
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
