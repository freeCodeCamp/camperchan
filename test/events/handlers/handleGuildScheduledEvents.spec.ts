import { describe, expect, it } from "vitest";
import { handleGuildScheduledEvents }
  from "../../../src/events/handlers/handleGuildScheduledEvents.js";

describe("handleGuildScheduledEvents", () => {
  it("handleGuildScheduledEvents is a function", () => {
    expect(handleGuildScheduledEvents).toBeTypeOf("function");
  });
});
