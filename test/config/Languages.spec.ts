import { assert } from "chai";

import { Languages } from "../../src/config/Languages";

suite("Languages Config", () => {
  test("should be unique", () => {
    const set = new Set(Languages);
    assert.equal(set.size, Languages.length);
  });
});
