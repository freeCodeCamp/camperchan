import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { Command } from "../interfaces/command.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

const isModule = (module: unknown): module is Record<string, Command> => {
  return module !== null && typeof module === "object";
};

const isCommand
= (module: unknown, name: string): module is Record<string, Command> => {
  return isModule(module) && name in module
  && typeof module[name] === "object"
  && "run" in module[name] && "data" in module[name];
};

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
    const files = await readdir(
      join(process.cwd(), "prod", "commands"),
      "utf-8",
    );
    const result = await Promise.all(files.map(async(file) => {
      const status = await stat(join(process.cwd(), "prod", "commands", file));
      if (status.isDirectory()) {
        return null;
      }
      const [ name ] = file.split(".");
      if (name === undefined) {
        logHandler.error(`Cannot find name from ${file}.`);
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Dynamic import.
      const module
      = await import(join(process.cwd(), "prod", "commands", file));
      return isCommand(module, name)
        ? module[name]
        : null;
    }));
    return result.filter((r): r is Command => {
      return r !== null;
    });
  } catch (error) {
    await errorHandler(camperChan, "load commands module", error);
    return [];
  }
};
