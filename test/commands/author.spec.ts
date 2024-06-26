import { describe, assert, test } from "vitest";

import { author } from "../../src/commands/author.js";

describe("author command", () => {
  test("is defined", () => {
    assert.isDefined(author);
  });
});
