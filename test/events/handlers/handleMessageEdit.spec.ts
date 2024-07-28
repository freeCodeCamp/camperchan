import { describe, assert, test } from "vitest";
import { handleMessageEdit }
  from "../../../src/events/handlers/handleMessageEdit.js";

describe("handleMessageEdit", () => {
  test("handleMessageEdit is a function", () => {
    assert.isFunction(handleMessageEdit);
  });
});
