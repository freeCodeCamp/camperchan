import { assert } from "chai";

import { Badges } from "../../src/config/Badges";

suite("Badges Config", () => {
  test("should be unique", () => {
    const set = new Set(Badges.map((b) => b.name));
    assert.equal(set.size, Badges.length);
  });
});
