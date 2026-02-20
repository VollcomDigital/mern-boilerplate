import pino from "pino";
import { env } from "../config/env.js";

/**
 * Structured JSON logger (Pino).
 * No console.log usage in application code.
 */
export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
          },
        },
});
