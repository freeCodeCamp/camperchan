import { assert } from "chai";

import { Truisms } from "../../src/config/Truisms";

suite("Truisms", () => {
  test("Truisms should be formatted correctly.", () => {
    for (const truism of Truisms) {
      assert.isAtMost(truism.length, 4000, "Truism exceeds Discord limits.");
    }
  });
});
