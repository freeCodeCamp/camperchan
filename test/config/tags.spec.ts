import { describe, expect, it } from "vitest";
import { tags } from "../../src/config/tags.js";

describe("tags", () => {
  it("quantity", () => {
    expect(tags.length, "Cannot have more than 25 tags.").toBeLessThanOrEqual(25);
  });
  it.each(tags)(`%s should be formatted correctly.`, (tag) => {
    expect(tag.name.length, "Name is too long.").toBeLessThanOrEqual(100);
    expect(tag.message.length, "Message exceeds Discord limits.").toBeLessThanOrEqual(4000);
  });
});
