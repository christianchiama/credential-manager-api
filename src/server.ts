import http from "http";
import https from "https";
import { app } from "app";
import { ENV } from "@config/index";
import dbConnect from "database";
import { logger } from "@middleware/logger";

const server: http.Server | https.Server = http.createServer(app);

/**
 * Start the node server on port ENV.SERVER_PORT or 8000
 * @param server
 */
async function startServer(server: http.Server | https.Server): Promise<void> {
  server.listen(ENV.SERVER_PORT || 8000, () => {
    const url = `${ENV.SERVER_PROTOCOL || "http"}://${
      ENV.SERVER_HOST || "localhost"
    }:${ENV.SERVER_PORT || 8000}`;
    logger.info(
      `🚀 API is now running on ${url} in ${ENV.NODE_ENV || "development"} mode`
    );
  });
}

(async () => {
  try {
    await dbConnect();
    await startServer(server);
  } catch (error) {
    logger.error(`❌ Server Connection Error: ${error}`);
  }
})();
