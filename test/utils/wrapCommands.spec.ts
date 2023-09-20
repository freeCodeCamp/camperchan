import { assert } from "chai";

import { wrapCommands } from "../../src/utils/wrapCommands";

suite("wrapCommands", () => {
  test("is defined", () => {
    assert.isDefined(wrapCommands, "wrapCommands is not defined");
    assert.isFunction(wrapCommands, "wrapCommands is not a function");
  });

  test("should parse a command array correctly", () => {
    const commands = [
      {
        data: {
          name: "regular command",
        },
        run: async () => {},
      },
      {
        data: {
          name: "guild command",
        },
        run: async () => {},
        guildOnly: true,
      },
      {
        data: {
          name: "privileged command",
        },
        run: async () => {},
        guildOnly: true,
        requiredPermissions: ["ADMINISTRATOR"],
      },
    ];
    const wrapped = wrapCommands(commands as never);
    assert.lengthOf(wrapped, 3);
    assert.isTrue(wrapped[0].wrapped);
    assert.match(wrapped[0].run.toString(), /{ }/);
    assert.isTrue(wrapped[1].wrapped);
    assert.match(
      wrapped[1].run.toString(),
      /if\s*\(!interaction\.inCachedGuild\(\)\)/
    );
  });
});
