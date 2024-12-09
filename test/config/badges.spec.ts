import { describe, assert, it } from "vitest";
import { badges } from
  "../../src/config/badges.js";

describe("badges Config", () => {
  it("should be unique", () => {
    const set = new Set(badges.map((b) => {
      return b.name;
    }));
    assert.equal(set.size, badges.length);
  });
});
