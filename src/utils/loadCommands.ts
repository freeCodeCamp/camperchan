import { readdir, stat } from "fs/promises";
import { join } from "path";

import { Camperbot } from "../interfaces/Camperbot";
import { Command } from "../interfaces/Command";

import { errorHandler } from "./errorHandler";
import { logHandler } from "./logHandler";

/**
 * Reads the `/commands` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {Camperbot} Bot Bot's Discord instance.
 * @returns {Command[]} Array of Command objects representing the imported commands.
 */
export const loadCommands = async (Bot: Camperbot): Promise<Command[]> => {
  try {
    const result: Command[] = [];
    const files = await readdir(
      join(process.cwd() + "/dist/commands"),
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
      const mod = await import(join(process.cwd() + `/dist/commands/${file}`));
      result.push(mod[name] as Command);
    }
    return result;
  } catch (err) {
    await errorHandler(Bot, err);
    return [];
  }
};
