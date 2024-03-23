import { assert } from "chai";

import { handleGuildScheduledEvents } from "../../../src/events/handlers/handleGuildScheduledEvents";

suite("handleGuildScheduledEvents", () => {
  test("handleGuildScheduledEvents is a function", () => {
    assert.isFunction(handleGuildScheduledEvents);
  });
});
