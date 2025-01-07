import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { Context } from "../interfaces/context.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

const isModule = (module: unknown): module is Record<string, Context> => {
  return module !== null && typeof module === "object";
};

const isCommand
= (module: unknown, name: string): module is Record<string, Context> => {
  return isModule(module) && name in module
  && typeof module[name] === "object"
  && "run" in module[name] && "data" in module[name];
};

/**
 * Reads the `/contexts` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 * @param camperChan - CamperChan's Discord instance.
 * @returns Array of Command objects representing the imported commands.
 */
export const loadContexts = async(
  camperChan: ExtendedClient,
): Promise<Array<Context>> => {
  try {
    const files = await readdir(
      join(process.cwd(), "prod", "contexts"),
      "utf-8",
    );
    const result = await Promise.all(files.map(async(file) => {
      const status = await stat(join(process.cwd(), "prod", "contexts", file));
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
      = await import(join(process.cwd(), "prod", "contexts", file));
      return isCommand(module, name)
        ? module[name]
        : null;
    }));
    return result.filter((r): r is Context => {
      return r !== null;
    });
  } catch (error) {
    await errorHandler(camperChan, "load contexts module", error);
    return [];
  }
};
