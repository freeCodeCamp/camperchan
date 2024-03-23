import { readdir } from "fs/promises";
import { join } from "path";

import { assert } from "chai";

import { Command } from "../../src/interfaces/Command";
import { ExtendedClient } from "../../src/interfaces/ExtendedClient";
import { loadCommands } from "../../src/utils/loadCommands";

suite("loadCommands", () => {
  test("is defined", () => {
    assert.isDefined(loadCommands, "loadCommands is not defined");
    assert.isFunction(loadCommands, "loadCommands is not a function");
  });

  test("returns array of commands", async () => {
    const result = await loadCommands({} as ExtendedClient);
    assert.isArray(result, "loadCommands did not return an array");
  });

  test("returns the expected command list", async () => {
    const bot: { commands: Command[] } = {
      commands: []
    };
    const commandFiles = await readdir(join(process.cwd(), "src", "commands"));
    const commandNames = commandFiles
      .filter((f) => f.endsWith(".ts"))
      .map((file) => file.split(".")[0]);
    bot.commands = await loadCommands(bot as never);
    assert.equal(bot.commands.length, commandNames.length);
    for (const name of commandNames) {
      assert.exists(
        bot.commands.find(
          (command) =>
            command.data.name
              .split("-")
              .reduce(
                (acc, el, i) =>
                  i === 0
                    ? acc + el
                    : acc +
                      (el[0].toUpperCase() + el.substring(1).toLowerCase()),
                ""
              ) === name
        )
      );
    }
  });
});
