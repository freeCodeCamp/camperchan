import { describe, assert, test } from "vitest";

import { PullComments } from "../../src/config/PullComments.js";

describe("PullComments", () => {
  test("All keys should be under 100 characters (Discord limitation)", () => {
    for (const obj of PullComments) {
      assert.isBelow(
        obj.key.length,
        100,
        `${obj.key} is ${obj.key.length} characters long`
      );
    }
  });
});
