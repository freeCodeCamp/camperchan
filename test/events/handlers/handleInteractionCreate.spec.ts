import { describe, assert, test } from "vitest";

import { handleInteractionCreate } from "../../../src/events/handlers/handleInteractionCreate";

describe("handleInteractionCreate", () => {
  test("handleInteractionCreate is a function", () => {
    assert.isFunction(handleInteractionCreate);
  });
});
