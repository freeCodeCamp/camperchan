import { describe, assert, it } from "vitest";
import { tags } from "../../src/config/tags.js";

describe("tags", () => {
  it("quantity", () => {
    assert.isAtMost(tags.length, 25, "Cannot have more than 25 tags.");
  });
  it.each(tags)(`%s should be formatted correctly.`, (tag) => {
    assert.isAtMost(tag.name.length, 100, "Name is too long.");
    assert.isAtMost(
      tag.message.length,
      4000,
      "Message exceeds Discord limits.",
    );
  });
});
