import { readdir, stat } from "fs/promises";
import { join } from "path";

import { Command } from "../interfaces/Command.js";
import { ExtendedClient } from "../interfaces/ExtendedClient.js";

import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";

/**
 * Reads the `/commands` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {ExtendedClient} CamperChan CamperChan's Discord instance.
 * @returns {Command[]} Array of Command objects representing the imported commands.
 */
export const loadCommands = async (
  CamperChan: ExtendedClient
): Promise<Command[]> => {
  try {
    const result: Command[] = [];
    const files = await readdir(
      join(process.cwd(), "prod", "commands"),
      "utf-8"
    );
    for (const file of files) {
      const status = await stat(join(process.cwd(), "dist", "commands", file));
      if (status.isDirectory()) {
        continue;
      }
      const name = file.split(".")[0];
      if (!name) {
        logHandler.error(`Cannot find name from ${file}.`);
        continue;
      }
      const mod = await import(join(process.cwd(), "prod", "commands", "file"));
      result.push(mod[name] as Command);
    }
    return result;
  } catch (err) {
    await errorHandler(CamperChan, "load commands module", err);
    return [];
  }
};
