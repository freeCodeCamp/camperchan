/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { Command } from "../interfaces/command.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Reads the `/commands` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 * @param camperChan - CamperChan's Discord instance.
 * @returns Array of Command objects representing the imported commands.
 */
export const loadCommands = async(
  camperChan: ExtendedClient,
): Promise<Array<Command>> => {
  try {
    const result: Array<Command> = [];
    const files = await readdir(
      join(process.cwd(), "prod", "commands"),
      "utf-8",
    );
    for (const file of files) {
      const status = await stat(join(process.cwd(), "prod", "commands", file));
      if (status.isDirectory()) {
        continue;
      }
      const [ name ] = file.split(".");
      if (name === undefined) {
        logHandler.error(`Cannot find name from ${file}.`);
        continue;
      }
      const module
      = await import(join(process.cwd(), "prod", "commands", file));
      result.push(module[name] as Command);
    }
    return result;
  } catch (error) {
    await errorHandler(camperChan, "load commands module", error);
    return [];
  }
};
