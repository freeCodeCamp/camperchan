import { writeFile } from "fs/promises";
import { join } from "path";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Creates the initial ticket log file.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {string} channelId The private channel ID, used as a unique identifier.
 */
export const createLogFile = async (
  Bot: Camperbot,
  channelId: string
): Promise<void> => {
  try {
    Bot.privateLogs[channelId] = channelId;

    await writeFile(
      join(process.cwd(), "logs", `${channelId}.txt`),
      `[${new Date().toLocaleString()}] - **TICKET CREATED**\n`
    );
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
