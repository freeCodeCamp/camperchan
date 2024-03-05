import { assert } from "chai";

import { userSettings } from "../../src/commands/userSettings";

suite("user settings command", () => {
  test("exists", () => {
    assert.exists(userSettings);
  });
});
