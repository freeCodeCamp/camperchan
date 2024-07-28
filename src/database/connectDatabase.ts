import { PrismaClient } from "@prisma/client";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Handles connecting to the database and attaching the database to
 * ExtendedClient.
 * @param camperChan - The camperChan's Discord instance.
 */
export const connectDatabase
= async(camperChan: ExtendedClient): Promise<void> => {
  try {
    camperChan.db = new PrismaClient();
    await camperChan.db.$connect();
    await camperChan.config.debugHook.send("Database Connected");
  } catch (error) {
    await errorHandler(camperChan, "database connection", error);
  }
};
