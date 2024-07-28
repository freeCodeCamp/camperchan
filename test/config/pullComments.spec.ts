import { describe, assert, test } from "vitest";
import { pullComments } from "../../src/config/pullComments.js";

describe("pullComments", () => {
  test("All keys should be under 100 characters (Discord limitation)", () => {
    for (const object of pullComments) {
      assert.isBelow(
        object.key.length,
        100,
        `${object.key} is ${object.key.length} characters long`,
      );
    }
  });
});
