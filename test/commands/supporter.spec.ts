import { describe, assert, it } from "vitest";
import { supporter } from "../../src/commands/supporter.js";

describe("supporter command", () => {
  it("is defined", () => {
    assert.isDefined(supporter);
  });
});
