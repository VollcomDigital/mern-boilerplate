import "dotenv/config";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { logger } from "./utils/logger.js";

const PORT = env.PORT;

async function bootstrap(): Promise<void> {
  if (env.MONGODB_URI) {
    await connectDatabase(env.MONGODB_URI);
  }

  app.listen(PORT, () => {
    logger.info({ port: PORT, env: env.NODE_ENV }, "Server started");
  });
}

bootstrap().catch((err) => {
  logger.fatal({ err }, "Failed to start server");
  process.exit(1);
});
