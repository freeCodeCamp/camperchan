import { assert } from "chai";

import { handleReady } from "../../src/events/handlers/handleReady";

suite("handleReady", () => {
  test("handleReady is a function", () => {
    assert.isFunction(handleReady);
  });
});
