import { z } from "zod";

/**
 * Environment configuration validated at startup using Zod.
 * Fails fast if required variables are missing or invalid.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().min(1).max(65535).default(4000),
  MONGODB_URI: z.union([z.string().url(), z.literal("")]).default(""),
  JWT_SECRET: z.string().min(32).optional().default("dev-secret-must-be-32-chars-minimum"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1000).default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().min(1).default(100),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.format();
    // eslint-disable-next-line no-console -- Startup validation must output to stderr
    console.error("❌ Invalid environment configuration:\n", JSON.stringify(errors, null, 2));
    process.exit(1);
  }

  return result.data;
}

export const env = loadEnv();
