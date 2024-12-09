import { describe, assert, it } from "vitest";
import { snippet } from "../../src/contexts/snippet.js";

describe("snippet context", () => {
  it("is defined", () => {
    assert.isDefined(snippet);
  });
});
