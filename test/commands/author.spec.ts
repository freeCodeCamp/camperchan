import { describe, assert, it } from "vitest";
import { author } from "../../src/commands/author.js";

describe("author command", () => {
  it("is defined", () => {
    assert.isDefined(author);
  });
});
