import { describe, assert, test } from "vitest";
import { handleReady } from "../../../src/events/handlers/handleReady.js";

describe("handleReady", () => {
  test("handleReady is a function", () => {
    assert.isFunction(handleReady);
  });
});
