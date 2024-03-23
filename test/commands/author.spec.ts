import { assert } from "chai";

import { author } from "../../src/commands/author";

suite("author command", () => {
  test("is defined", () => {
    assert.isDefined(author);
  });
});
