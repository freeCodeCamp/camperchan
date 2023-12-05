import { assert } from "chai";

import { supporter } from "../../src/commands/supporter";

suite("supporter command", () => {
  test("is defined", () => {
    assert.isDefined(supporter);
  });
});
