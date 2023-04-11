import { assert } from "chai";

import { Camperbot } from "../../src/interfaces/Camperbot";
import { loadCommands } from "../../src/utils/loadCommands";
import { CommandNames } from "../__mocks__/statics";

suite("loadCommands", () => {
  test("is defined", () => {
    assert.isDefined(loadCommands, "loadCommands is not defined");
    assert.isFunction(loadCommands, "loadCommands is not a function");
  });

  test("returns array of commands", async () => {
    const result = await loadCommands({} as Camperbot);
    assert.isArray(result, "loadCommands did not return an array");
  });

  test("returns the expected command list", async () => {
    const result = await loadCommands({} as Camperbot);
    assert.equal(
      result.length,
      CommandNames.length,
      "does not return the expected number of commands"
    );
    const names = result.map((el) => el.data.name);
    assert.deepEqual(names, CommandNames, "does not return the expected list");
  });
});
