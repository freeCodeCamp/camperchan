import { describe, assert, it } from "vitest";
import { handleGuildScheduledEvents }
  from "../../../src/events/handlers/handleGuildScheduledEvents.js";

describe("handleGuildScheduledEvents", () => {
  it("handleGuildScheduledEvents is a function", () => {
    assert.isFunction(handleGuildScheduledEvents);
  });
});
