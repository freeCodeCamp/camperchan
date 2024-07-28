import { describe, assert, test } from "vitest";
import { badges } from
  "../../src/config/badges.js";

describe("badges Config", () => {
  test("should be unique", () => {
    const set = new Set(badges.map((b) => {
      return b.name;
    }));
    assert.equal(set.size, badges.length);
  });
});
