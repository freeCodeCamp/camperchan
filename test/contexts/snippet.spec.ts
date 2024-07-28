import { describe, assert, test } from "vitest";
import { snippet } from "../../src/contexts/snippet.js";

describe("snippet context", () => {
  test("is defined", () => {
    assert.isDefined(snippet);
  });
});
