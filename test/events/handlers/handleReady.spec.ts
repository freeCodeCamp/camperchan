import { describe, expect, it, vi } from "vitest";
import { handleReady } from "../../../src/events/handlers/handleReady.js";

vi.mock("discord.js");

describe("handleReady", () => {
  it("handleReady is a function", () => {
    expect(handleReady).toBeTypeOf("function");
  });
});
