import { describe, assert, test } from "vitest";
import { translator } from "../../src/commands/translator.js";

describe("translator command", () => {
  test("is defined", () => {
    assert.isDefined(translator);
  });
});
