import cron, { ScheduledTask } from "node-cron";

import { logger } from "./logger";

const runEverySecond: ScheduledTask = cron.schedule(
  "* * * * * *",
  () => {
    logger.info("I run every second");
  },
  { scheduled: false }
);

export { runEverySecond };
