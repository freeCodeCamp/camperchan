import { describe, assert, it } from "vitest";
import { truisms } from "../../src/config/truisms.js";

describe("truisms", () => {
  it("truisms should be formatted correctly.", () => {
    for (const truism of truisms) {
      assert.isAtMost(truism.length, 4000, "Truism exceeds Discord limits.");
    }
  });
});
