import type { Request, Response } from "express";
import { sendSuccess } from "../../utils/apiResponse.js";
import { getMe } from "./user.service.js";

/**
 * User controller.
 * Handles HTTP layer for user endpoints.
 */
export async function me(req: Request, res: Response): Promise<void> {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ success: false, data: null, error: "Unauthorized" });
    return;
  }
  const user = await getMe(userId);
  const sanitized = {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    createdAt:
      user.createdAt instanceof Date ? user.createdAt.toISOString() : String(user.createdAt),
  };
  sendSuccess(res, sanitized);
}
