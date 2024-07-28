import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { describe, assert, test } from "vitest";
import { loadContexts } from "../../src/utils/loadContexts.js";
import type { Context } from "../../src/interfaces/context.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadContexts", () => {
  test("is defined", () => {
    assert.isDefined(loadContexts, "loadContexts is not defined");
    assert.isFunction(loadContexts, "loadContexts is not a function");
  });

  test("returns array of commands", async() => {
    const result = await loadContexts({} as ExtendedClient);
    assert.isArray(result, "loadContexts did not return an array");
  });

  test("returns the expected command list", async() => {
    const bot: { contexts: Array<Context> } = { contexts: [] };
    const contextFiles = await readdir(join(process.cwd(), "src", "contexts"));
    const contextNames = contextFiles.map((file) => {
      return file.split(".")[0];
    });
    bot.contexts = await loadContexts(bot as never);
    assert.equal(bot.contexts.length, contextNames.length);
    for (const name of contextNames) {
      assert.exists(bot.contexts.find((context) => {
        return context.data.name === name;
      }));
    }
  });
});
