import { describe, assert, it } from "vitest";
import { handleMessageCreate }
  from "../../../src/events/handlers/handleMessageCreate.js";

describe("handleMessageCreate", () => {
  it("handleMessageCreate is a function", () => {
    assert.isFunction(handleMessageCreate);
  });
});
