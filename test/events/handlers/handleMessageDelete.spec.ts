import { describe, assert, it } from "vitest";
import { handleMessageDelete }
  from "../../../src/events/handlers/handleMessageDelete.js";

describe("handleMessageDelete", () => {
  it("handleMessageDelete is a function", () => {
    assert.isFunction(handleMessageDelete);
  });
});
