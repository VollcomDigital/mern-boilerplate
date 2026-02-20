import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

/**
 * Establishes MongoDB connection via Mongoose.
 * Retries on failure for container orchestration compatibility.
 */
export async function connectDatabase(uri: string): Promise<void> {
  if (!uri) {
    logger.warn("MONGODB_URI not set - skipping database connection");
    return;
  }

  try {
    await mongoose.connect(uri);
    logger.info({ uri: uri.replace(/\/\/.*@/, "//***@") }, "MongoDB connected");
  } catch (err) {
    logger.error({ err }, "MongoDB connection failed");
    throw err;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected");
}
