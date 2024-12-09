import { describe, assert, it } from "vitest";
import { handleInteractionCreate }
  from "../../../src/events/handlers/handleInteractionCreate.js";

describe("handleInteractionCreate", () => {
  it("handleInteractionCreate is a function", () => {
    assert.isFunction(handleInteractionCreate);
  });
});
