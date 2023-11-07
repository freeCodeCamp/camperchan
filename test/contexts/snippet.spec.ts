import { assert } from "chai";

import { snippet } from "../../src/contexts/snippet";

suite("snippet context", () => {
  test("is defined", () => {
    assert.isDefined(snippet);
  });
});
