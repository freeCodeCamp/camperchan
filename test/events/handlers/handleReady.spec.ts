import { describe, assert, test, vi } from "vitest";
import { handleReady } from "../../../src/events/handlers/handleReady.js";

vi.mock("discord.js");

describe("handleReady", () => {
  test("handleReady is a function", () => {
    assert.isFunction(handleReady);
  });
});
