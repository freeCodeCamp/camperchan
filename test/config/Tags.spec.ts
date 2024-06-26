import { describe, assert, test } from "vitest";

import { Tags } from "../../src/config/Tags";

describe("Tags", () => {
  test("quantity", () => {
    assert.isAtMost(Tags.length, 25, "Cannot have more than 25 tags.");
  });
  for (const tag of Tags) {
    test(`${tag.name} should be formatted correctly.`, () => {
      assert.isAtMost(tag.name.length, 100, "Name is too long.");
      assert.isAtMost(
        tag.message.length,
        4000,
        "Message exceeds Discord limits."
      );
    });
  }
});
