import type { Request, Response } from "express";
import { login, register } from "./auth.service.js";
import { sendSuccess } from "../../utils/apiResponse.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/**
 * Auth controller.
 * Sets JWT in HttpOnly cookie for security.
 */
export async function loginHandler(req: Request, res: Response): Promise<void> {
  const result = await login(req.body as LoginInput);
  res.cookie("token", result.token, COOKIE_OPTIONS);
  sendSuccess(res, { user: result.user });
}

export async function registerHandler(req: Request, res: Response): Promise<void> {
  const result = await register(req.body as RegisterInput);
  res.cookie("token", result.token, COOKIE_OPTIONS);
  sendSuccess(res, { user: result.user }, 201);
}

export function logoutHandler(_req: Request, res: Response): void {
  res.clearCookie("token");
  sendSuccess(res, { message: "Logged out" });
}
