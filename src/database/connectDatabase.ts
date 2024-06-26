import { PrismaClient } from "@prisma/client";

import { ExtendedClient } from "../interfaces/ExtendedClient.js";
import { errorHandler } from "../utils/errorHandler.js";

/**
 * Handles connecting to the database and attaching the database to
 * ExtendedClient.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 */
export const connectDatabase = async (CamperChan: ExtendedClient) => {
  try {
    CamperChan.db = new PrismaClient();
    await CamperChan.db.$connect();
    await CamperChan.config.debugHook.send("Database Connected");
  } catch (err) {
    await errorHandler(CamperChan, "database connection", err);
  }
};
