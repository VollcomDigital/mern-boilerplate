import { Router, type Request, type Response } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * Liveness: Process is alive.
 * Used by Kubernetes liveness probe.
 */
router.get("/liveness", (_req: Request, res: Response): void => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * Readiness: App can accept traffic.
 * Checks DB connection before reporting ready.
 */
router.get("/readiness", async (_req: Request, res: Response): Promise<void> => {
  const dbState = mongoose.connection.readyState;
  const isReady = dbState === 1; // 1 = connected

  if (!isReady) {
    res.status(503).json({
      status: "not ready",
      database: dbState === 0 ? "connecting" : dbState === 2 ? "disconnecting" : "disconnected",
    });
    return;
  }

  res.status(200).json({ status: "ready", database: "connected" });
});

export const healthRoutes = router;
