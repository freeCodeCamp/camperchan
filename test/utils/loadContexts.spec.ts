import { readdir } from "fs/promises";
import { join } from "path";

import { assert } from "chai";

import { Context } from "../../src/interfaces/Context";
import { ExtendedClient } from "../../src/interfaces/ExtendedClient";
import { loadContexts } from "../../src/utils/loadContexts";

suite("loadContexts", () => {
  test("is defined", () => {
    assert.isDefined(loadContexts, "loadContexts is not defined");
    assert.isFunction(loadContexts, "loadContexts is not a function");
  });

  test("returns array of commands", async () => {
    const result = await loadContexts({} as ExtendedClient);
    assert.isArray(result, "loadContexts did not return an array");
  });

  test("returns the expected command list", async () => {
    const bot: { contexts: Context[] } = { contexts: [] };
    const contextFiles = await readdir(join(process.cwd(), "src", "contexts"));
    const contextNames = contextFiles.map((file) => file.split(".")[0]);
    bot.contexts = await loadContexts(bot as never);
    assert.equal(bot.contexts.length, contextNames.length);
    for (const name of contextNames) {
      assert.exists(bot.contexts.find((context) => context.data.name === name));
    }
  });
});
