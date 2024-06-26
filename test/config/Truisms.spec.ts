import { describe, assert, test } from "vitest";

import { Truisms } from "../../src/config/Truisms.js";

describe("Truisms", () => {
  test("Truisms should be formatted correctly.", () => {
    for (const truism of Truisms) {
      assert.isAtMost(truism.length, 4000, "Truism exceeds Discord limits.");
    }
  });
});
