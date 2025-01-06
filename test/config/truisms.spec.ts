import { describe, expect, it } from "vitest";
import { truisms } from "../../src/config/truisms.js";

describe("truisms", () => {
  it("truisms should be formatted correctly.", () => {
    for (const truism of truisms) {
      expect(truism.length, "Truism exceeds Discord limits.").toBeLessThanOrEqual(4000);
    }
  });
});
