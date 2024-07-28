import { describe, assert, test } from "vitest";
import { truisms } from "../../src/config/truisms.js";

describe("truisms", () => {
  test("truisms should be formatted correctly.", () => {
    for (const truism of truisms) {
      assert.isAtMost(truism.length, 4000, "Truism exceeds Discord limits.");
    }
  });
});
