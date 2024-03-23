import { writeFile } from "fs/promises";
import { join } from "path";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

/**
 * Creates the initial ticket log file.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {string} channelId The private channel ID, used as a unique identifier.
 */
export const createLogFile = async (
  CamperChan: ExtendedClient,
  channelId: string
): Promise<void> => {
  try {
    CamperChan.privateLogs[channelId] = channelId;

    await writeFile(
      join(process.cwd(), "logs", `${channelId}.txt`),
      `[${new Date().toLocaleString()}] - **TICKET CREATED**\n`
    );
  } catch (err) {
    await errorHandler(CamperChan, "create log file module", err);
  }
};
