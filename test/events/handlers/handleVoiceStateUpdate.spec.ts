import { assert } from "chai";

import { handleVoiceStateUpdate } from "../../../src/events/handlers/handleVoiceStateUpdate";

suite("handleVoiceStateUpdate", () => {
  test("handleVoiceStateUpdate is a function", () => {
    assert.isFunction(handleVoiceStateUpdate);
  });
});
