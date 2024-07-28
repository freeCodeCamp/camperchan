import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { describe, assert, test } from "vitest";
import { loadCommands } from "../../src/utils/loadCommands.js";
import type { Command } from "../../src/interfaces/command.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadCommands", () => {
  test("is defined", () => {
    assert.isDefined(loadCommands, "loadCommands is not defined");
    assert.isFunction(loadCommands, "loadCommands is not a function");
  });

  test("returns array of commands", async() => {
    const result = await loadCommands({} as ExtendedClient);
    assert.isArray(result, "loadCommands did not return an array");
  });

  test("returns the expected command list", async() => {
    const bot: { commands: Array<Command> } = {
      commands: [],
    };
    const commandFiles = await readdir(join(process.cwd(), "src", "commands"));
    const commandNames = commandFiles.
      filter((f) => {
        return f.endsWith(".ts");
      }).
      map((file) => {
        return file.split(".")[0];
      });
    bot.commands = await loadCommands(bot as never);
    assert.equal(bot.commands.length, commandNames.length);
    for (const name of commandNames) {
      assert.exists(
        bot.commands.find(
          (command) => {
            return command.data.name.
              split("-").
              // eslint-disable-next-line unicorn/no-array-reduce
              reduce(
                (accumulator, element, index) => {
                  return index === 0
                    ? accumulator + element
                    : accumulator
                      + (element[0].toUpperCase()
                      + element.slice(1).toLowerCase());
                },
                "",
              ) === name;
          },
        ),
      );
    }
  });
});
