import { assert } from "chai";

import { wrapCommands } from "../../src/utils/wrapCommands";

suite("wrapCommands", () => {
  test("is defined", () => {
    assert.isDefined(wrapCommands, "wrapCommands is not defined");
    assert.isFunction(wrapCommands, "wrapCommands is not a function");
  });
});
