import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCommands } from "../../src/utils/loadCommands.js";
import type { Command } from "../../src/interfaces/command.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadCommands", () => {
  it("is defined", () => {
    expect(loadCommands, "loadCommands is not defined").toBeDefined();
    expect(loadCommands, "loadCommands is not a function").toBeTypeOf("function");
  });

  it("returns array of commands", async() => {
    const result = await loadCommands({} as ExtendedClient);
    assert.isArray(result, "loadCommands did not return an array");
  });

  it("returns the expected command list", async() => {
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
    expect(bot.commands).toHaveLength(commandNames.length);
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
