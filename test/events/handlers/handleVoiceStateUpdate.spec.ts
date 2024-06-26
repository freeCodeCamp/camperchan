import { describe, assert, test } from "vitest";

import { handleVoiceStateUpdate } from "../../../src/events/handlers/handleVoiceStateUpdate";

describe("handleVoiceStateUpdate", () => {
  test("handleVoiceStateUpdate is a function", () => {
    assert.isFunction(handleVoiceStateUpdate);
  });
});
