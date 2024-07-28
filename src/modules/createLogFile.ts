import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Creates the initial ticket log file.
 * @param camperChan - The camperChan's Discord instance.
 * @param channelId - The private channel ID, used as a unique identifier.
 */
export const createLogFile = async(
  camperChan: ExtendedClient,
  channelId: string,
): Promise<void> => {
  try {
    camperChan.privateLogs[channelId] = channelId;

    await writeFile(
      join(process.cwd(), "logs", `${channelId}.txt`),
      `[${new Date().toLocaleString()}] - **TICKET CREATED**\n`,
    );
  } catch (error) {
    await errorHandler(camperChan, "create log file module", error);
  }
};
