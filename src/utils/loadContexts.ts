import { readdir } from "fs/promises";
import { join } from "path";

import { Context } from "../interfaces/Context";
import { ExtendedClient } from "../interfaces/ExtendedClient";

import { errorHandler } from "./errorHandler";
import { logHandler } from "./logHandler";

/**
 * Reads the `/contexts` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {ExtendedClient} CamperChan CamperChan's Discord instance.
 * @returns {Context[]} Array of Context objects representing the imported commands.
 */
export const loadContexts = async (
  CamperChan: ExtendedClient
): Promise<Context[]> => {
  try {
    const result: Context[] = [];
    const files = await readdir(
      join(process.cwd() + "/dist/contexts"),
      "utf-8"
    );
    for (const file of files) {
      const name = file.split(".")[0];
      if (!name) {
        logHandler.error(`Cannot find name from ${file}.`);
        continue;
      }
      const mod = await import(join(process.cwd() + `/dist/contexts/${file}`));
      result.push(mod[name] as Context);
    }
    return result;
  } catch (err) {
    await errorHandler(CamperChan, "load contexts module", err);
    return [];
  }
};
