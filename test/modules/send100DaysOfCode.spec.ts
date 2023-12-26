import { assert } from "chai";

import { send100DaysOfCode } from "../../src/modules/send100DaysOfCode";

suite("send100DaysOfCode", () => {
  test("send100DaysOfCode is a function", () => {
    assert.isFunction(send100DaysOfCode);
  });
});
