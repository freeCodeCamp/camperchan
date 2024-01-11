import { assert } from "chai";

import { translator } from "../../src/commands/translator";

suite("translator command", () => {
  test("is defined", () => {
    assert.isDefined(translator);
  });
});
