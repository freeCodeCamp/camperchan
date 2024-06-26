import { describe, assert, test } from "vitest";

import { handleGuildScheduledEvents } from "../../../src/events/handlers/handleGuildScheduledEvents.js";

describe("handleGuildScheduledEvents", () => {
  test("handleGuildScheduledEvents is a function", () => {
    assert.isFunction(handleGuildScheduledEvents);
  });
});
