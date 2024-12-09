import { describe, assert, it } from "vitest";
import { translator } from "../../src/commands/translator.js";

describe("translator command", () => {
  it("is defined", () => {
    assert.isDefined(translator);
  });
});
