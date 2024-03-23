import { PrismaClient } from "@prisma/client";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles connecting to the database and attaching the database to
 * Camperbot.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 */
export const connectDatabase = async (Bot: Camperbot) => {
  try {
    Bot.db = new PrismaClient();
    await Bot.db.$connect();
    await Bot.config.debugHook.send("Database Connected");
  } catch (err) {
    await errorHandler(Bot, "database connection", err);
  }
};
