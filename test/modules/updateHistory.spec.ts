import { assert } from "chai";

import { updateHistory } from "../../src/modules/updateHistory";

suite("updateHistory", () => {
  test("updateHistory is a function", () => {
    assert.isFunction(updateHistory);
  });
});
