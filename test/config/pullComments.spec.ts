import { describe, expect, it } from "vitest";
import { pullComments } from "../../src/config/pullComments.js";

describe("pullComments", () => {
  it("all keys should be under 100 characters (Discord limitation)", () => {
    for (const object of pullComments) {
      expect(object.key.length, `${object.key} is ${object.key.length} characters long`).toBeLessThan(100);
    }
  });
});
