import { PrismaClient } from "@prisma/client";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles connecting to the database and attaching the database to
 * ExtendedClient.
 *
 * @param {ExtendedClient} Bot The bot's Discord instance.
 */
export const connectDatabase = async (Bot: ExtendedClient) => {
  try {
    Bot.db = new PrismaClient();
    await Bot.db.$connect();
    await Bot.config.debugHook.send("Database Connected");
  } catch (err) {
    await errorHandler(Bot, "database connection", err);
  }
};
