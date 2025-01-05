import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadContexts } from "../../src/utils/loadContexts.js";
import type { Context } from "../../src/interfaces/context.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadContexts", () => {
  it("is defined", () => {
    expect(loadContexts,"loadContexts is not defined").toBeDefined();
    expect(loadContexts, "loadContexts is not a function").toBeTypeOf("function");
  });

  it("returns array of commands", async() => {
    const result = await loadContexts({} as ExtendedClient);
    assert.isArray(result, "loadContexts did not return an array");
  });

  it("returns the expected command list", async() => {
    const bot: { contexts: Array<Context> } = { contexts: [] };
    const contextFiles = await readdir(join(process.cwd(), "src", "contexts"));
    const contextNames = contextFiles.map((file) => {
      return file.split(".")[0];
    });
    bot.contexts = await loadContexts(bot as never);
    expect(bot.contexts.length).toBe(contextNames.length);
    for (const name of contextNames) {
      assert.exists(bot.contexts.find((context) => {
        return context.data.name === name;
      }));
    }
  });
});
