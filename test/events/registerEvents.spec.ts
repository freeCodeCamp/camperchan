import { assert } from "chai";

import { registerEvents } from "../../src/events/registerEvents";

suite("registerEvents", () => {
  test("registerEvents is a function", () => {
    assert.isFunction(registerEvents);
  });
});
