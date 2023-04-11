import { assert } from "chai";

import { handleInteractionCreate } from "../../src/events/handlers/handleInteractionCreate";

suite("handleInteractionCreate", () => {
  test("handleInteractionCreate is a function", () => {
    assert.isFunction(handleInteractionCreate);
  });
});
