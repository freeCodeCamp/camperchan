import { describe, assert, it, vi } from "vitest";
import { handleReady } from "../../../src/events/handlers/handleReady.js";

vi.mock("discord.js");

describe("handleReady", () => {
  it("handleReady is a function", () => {
    assert.isFunction(handleReady);
  });
});
