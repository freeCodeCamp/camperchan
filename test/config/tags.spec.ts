import { describe, assert, test } from "vitest";
import { tags } from "../../src/config/tags.js";

describe("tags", () => {
  test("quantity", () => {
    assert.isAtMost(tags.length, 25, "Cannot have more than 25 tags.");
  });
  for (const tag of tags) {
    test(`${tag.name} should be formatted correctly.`, () => {
      assert.isAtMost(tag.name.length, 100, "Name is too long.");
      assert.isAtMost(
        tag.message.length,
        4000,
        "Message exceeds Discord limits.",
      );
    });
  }
});
