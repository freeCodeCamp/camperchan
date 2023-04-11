import { assert } from "chai";

import { levelListener } from "../../src/modules/levelListener";

suite("levelListener", () => {
  test("levelListener is a function", () => {
    assert.isFunction(levelListener);
  });
});
