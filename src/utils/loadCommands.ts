import { readdir } from "fs/promises";
import { join } from "path";

import { Camperbot } from "../interfaces/Camperbot";
import { Command } from "../interfaces/Command";

import { errorHandler } from "./errorHandler";

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
      const name = file.split(".")[0];
      const mod = await import(join(process.cwd() + `/dist/commands/${file}`));
      result.push(mod[name] as Command);
    }
    return result;
  } catch (err) {
    await errorHandler(Bot, err);
    return [];
  }
};
