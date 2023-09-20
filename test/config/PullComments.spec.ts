import { assert } from "chai";

import { PullComments } from "../../src/config/PullComments";

suite("PullComments", () => {
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
