import { describe, assert, it } from "vitest";
import { handleVoiceStateUpdate }
  from "../../../src/events/handlers/handleVoiceStateUpdate.js";

describe("handleVoiceStateUpdate", () => {
  it("handleVoiceStateUpdate is a function", () => {
    assert.isFunction(handleVoiceStateUpdate);
  });
});
