import { describe, assert, it } from "vitest";
import { handleMessageEdit }
  from "../../../src/events/handlers/handleMessageEdit.js";

describe("handleMessageEdit", () => {
  it("handleMessageEdit is a function", () => {
    assert.isFunction(handleMessageEdit);
  });
});
