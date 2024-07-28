/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { Context } from "../interfaces/context.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Reads the `/contexts` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 * @param camperChan - CamperChan's Discord instance.
 * @returns Array of Context objects representing the imported commands.
 */
export const loadContexts = async(
  camperChan: ExtendedClient,
): Promise<Array<Context>> => {
  try {
    const result: Array<Context> = [];
    const files = await readdir(
      join(process.cwd(), "prod", "contexts"),
      "utf-8",
    );
    for (const file of files) {
      const [ name ] = file.split(".");
      if (name === undefined) {
        logHandler.error(`Cannot find name from ${file}.`);
        continue;
      }
      const module
      = await import(join(process.cwd(), "prod", "contexts", file));
      result.push(module[name] as Context);
    }
    return result;
  } catch (error) {
    await errorHandler(camperChan, "load contexts module", error);
    return [];
  }
};
