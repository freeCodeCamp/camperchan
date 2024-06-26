import { describe, assert, test } from "vitest";

import { Badges } from "../../src/config/Badges.js";

describe("Badges Config", () => {
  test("should be unique", () => {
    const set = new Set(Badges.map((b) => b.name));
    assert.equal(set.size, Badges.length);
  });
});
