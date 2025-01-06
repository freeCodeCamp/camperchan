import { describe, expect, it } from "vitest";
import { badges } from
  "../../src/config/badges.js";

describe("badges Config", () => {
  it("should be unique", () => {
    const set = new Set(badges.map((b) => {
      return b.name;
    }));
    expect(set.size).toBe(badges.length);
  });
});
